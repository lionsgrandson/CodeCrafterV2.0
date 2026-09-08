param(
  [string]$Domain = 'mosheschwartzberg.com',
  [switch]$PurgeCache
)

$ErrorActionPreference = 'Stop'
$ApiBase = 'https://api.cloudflare.com/client/v4'
$RuleRef = 'codecrafter_seo_noindex_nonpage_assets'
$RuleDescription = 'CodeCrafter SEO: keep non-page assets out of search results'
$Phase = 'http_response_headers_transform'

function Fail([string]$Message) {
  Write-Host "[ERROR] $Message" -ForegroundColor Red
  exit 1
}

function Read-CloudflareToken {
  if ($env:CLOUDFLARE_API_TOKEN) {
    return
  }

  Write-Host 'A Cloudflare API token is required.' -ForegroundColor Yellow
  Write-Host 'Use a scoped token with Zone:Read + Transform Rules:Edit. Add Cache Purge permission only if you want the purge step.'
  $secureToken = Read-Host 'Paste Cloudflare API token (input is hidden)' -AsSecureString
  $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureToken)
  try {
    $plainToken = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
    if (-not $plainToken) {
      Fail 'No Cloudflare API token was supplied.'
    }
    $env:CLOUDFLARE_API_TOKEN = $plainToken
  }
  finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
  }
}

function Invoke-CloudflareApi {
  param(
    [Parameter(Mandatory = $true)][ValidateSet('GET', 'POST', 'PATCH', 'PUT', 'DELETE')][string]$Method,
    [Parameter(Mandatory = $true)][string]$Uri,
    [object]$Body = $null
  )

  $headers = @{
    Authorization = "Bearer $env:CLOUDFLARE_API_TOKEN"
    'Content-Type' = 'application/json'
  }

  try {
    if ($null -eq $Body) {
      return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers
    }

    $json = $Body | ConvertTo-Json -Depth 20 -Compress
    return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers -Body $json
  }
  catch {
    $details = $_.ErrorDetails.Message
    if (-not $details) { $details = $_.Exception.Message }
    throw "Cloudflare API $Method $Uri failed: $details"
  }
}

Read-CloudflareToken

Write-Host "[1/5] Resolving Cloudflare zone for $Domain..."
$zoneId = $env:CLOUDFLARE_ZONE_ID
if (-not $zoneId) {
  $encodedDomain = [uri]::EscapeDataString($Domain)
  $zoneResponse = Invoke-CloudflareApi -Method GET -Uri "$ApiBase/zones?name=$encodedDomain&status=active"
  if (-not $zoneResponse.success -or -not $zoneResponse.result -or $zoneResponse.result.Count -lt 1) {
    Fail "Could not resolve an active Cloudflare zone for $Domain."
  }
  $zoneId = $zoneResponse.result[0].id
}
Write-Host "[OK] Zone ID: $zoneId"

Write-Host '[2/5] Finding the response-header transform ruleset...'
$rulesetsResponse = Invoke-CloudflareApi -Method GET -Uri "$ApiBase/zones/$zoneId/rulesets"
if (-not $rulesetsResponse.success) {
  Fail 'Could not list Cloudflare rulesets.'
}

$ruleset = $rulesetsResponse.result | Where-Object { $_.phase -eq $Phase -and $_.kind -eq 'zone' } | Select-Object -First 1

$assetExpression = @'
(ends_with(lower(http.request.uri.path), ".js") or ends_with(lower(http.request.uri.path), ".mjs") or ends_with(lower(http.request.uri.path), ".css") or ends_with(lower(http.request.uri.path), ".map") or ends_with(lower(http.request.uri.path), ".json") or ends_with(lower(http.request.uri.path), ".webmanifest") or lower(http.request.uri.path) eq "/favicon.svg")
'@.Trim()

$ruleDefinition = [ordered]@{
  ref = $RuleRef
  description = $RuleDescription
  expression = $assetExpression
  action = 'rewrite'
  action_parameters = @{
    headers = @{
      'X-Robots-Tag' = @{
        operation = 'set'
        value = 'noindex'
      }
    }
  }
  enabled = $true
}

if (-not $ruleset) {
  Write-Host '[3/5] Creating the response-header transform ruleset and SEO rule...'
  $createBody = [ordered]@{
    name = 'Zone-level Response Headers Transform Ruleset'
    description = 'Zone-level response header rules managed for CodeCrafter.'
    kind = 'zone'
    phase = $Phase
    rules = @($ruleDefinition)
  }
  $createResponse = Invoke-CloudflareApi -Method POST -Uri "$ApiBase/zones/$zoneId/rulesets" -Body $createBody
  if (-not $createResponse.success) { Fail 'Cloudflare rejected ruleset creation.' }
  $ruleset = $createResponse.result
  Write-Host '[OK] Created ruleset and X-Robots-Tag rule.'
}
else {
  $rulesetId = $ruleset.id
  $rulesetDetail = Invoke-CloudflareApi -Method GET -Uri "$ApiBase/zones/$zoneId/rulesets/$rulesetId"
  if (-not $rulesetDetail.success) { Fail 'Could not read the response-header ruleset.' }

  $existingRule = $rulesetDetail.result.rules | Where-Object {
    $_.ref -eq $RuleRef -or $_.description -eq $RuleDescription
  } | Select-Object -First 1

  if ($existingRule) {
    Write-Host '[3/5] Updating existing CodeCrafter SEO response-header rule...'
    $updateResponse = Invoke-CloudflareApi -Method PATCH -Uri "$ApiBase/zones/$zoneId/rulesets/$rulesetId/rules/$($existingRule.id)" -Body $ruleDefinition
    if (-not $updateResponse.success) { Fail 'Cloudflare rejected the SEO rule update.' }
    Write-Host '[OK] Updated X-Robots-Tag rule without replacing unrelated Cloudflare rules.'
  }
  else {
    Write-Host '[3/5] Adding CodeCrafter SEO response-header rule...'
    $addResponse = Invoke-CloudflareApi -Method POST -Uri "$ApiBase/zones/$zoneId/rulesets/$rulesetId/rules" -Body $ruleDefinition
    if (-not $addResponse.success) { Fail 'Cloudflare rejected the SEO rule.' }
    Write-Host '[OK] Added X-Robots-Tag rule without replacing unrelated Cloudflare rules.'
  }
}

$shouldPurge = $PurgeCache -or $env:CLOUDFLARE_PURGE_CACHE -eq '1'
if ($shouldPurge) {
  Write-Host '[4/5] Purging Cloudflare cache...'
  try {
    $purgeResponse = Invoke-CloudflareApi -Method POST -Uri "$ApiBase/zones/$zoneId/purge_cache" -Body @{ purge_everything = $true }
    if ($purgeResponse.success) {
      Write-Host '[OK] Cloudflare cache purged.'
    }
    else {
      Write-Warning 'Cloudflare did not confirm the cache purge. The SEO rule itself is still configured.'
    }
  }
  catch {
    Write-Warning "Cache purge failed, usually because the token lacks Cache Purge permission. SEO rule configuration is unaffected. $($_.Exception.Message)"
  }
}
else {
  Write-Host '[4/5] Cache purge skipped. Use -PurgeCache or CLOUDFLARE_PURGE_CACHE=1 if required.'
}

Write-Host '[5/5] Verifying the live edge header when possible...'
try {
  $home = Invoke-WebRequest -Uri "https://$Domain/" -UseBasicParsing -Headers @{ 'Cache-Control' = 'no-cache' }
  $match = [regex]::Match($home.Content, 'src=["''](?<path>/assets/[^"'']+\.(?:js|mjs))["'']', 'IgnoreCase')
  if ($match.Success) {
    $assetUrl = "https://$Domain$($match.Groups['path'].Value)"
    $assetResponse = Invoke-WebRequest -Uri $assetUrl -Method Head -UseBasicParsing -Headers @{ 'Cache-Control' = 'no-cache' }
    $robotsHeader = $assetResponse.Headers['X-Robots-Tag']
    if ($robotsHeader -and $robotsHeader -match 'noindex') {
      Write-Host "[OK] Live asset returns X-Robots-Tag: $robotsHeader"
    }
    else {
      Write-Warning "Rule saved, but the live asset does not yet show X-Robots-Tag. Confirm the DNS record is proxied through Cloudflare and retry after deployment/cache propagation. Asset: $assetUrl"
    }
  }
  else {
    Write-Warning 'Could not discover the current hashed JS asset from the homepage. Run npm run seo:audit:production after deployment.'
  }
}
catch {
  Write-Warning "Live verification failed: $($_.Exception.Message)"
}

Write-Host ''
Write-Host 'Cloudflare SEO hardening complete.' -ForegroundColor Green
Write-Host 'The rule allows Google to crawl JS/CSS for rendering, but prevents those non-page resources from becoming standalone search results.'
