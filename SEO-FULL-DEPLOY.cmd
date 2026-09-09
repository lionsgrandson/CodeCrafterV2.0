@echo off
setlocal EnableExtensions
cd /d "%~dp0"

title CodeCrafter - Full SEO Deploy and Verification

echo ============================================================
echo   CODECRAFTER - FULL SEO BUILD + CLOUDFLARE + LIVE AUDIT
echo ============================================================
echo.

where git >nul 2>&1 || goto :missing_git
where node >nul 2>&1 || goto :missing_node
where npm >nul 2>&1 || goto :missing_node
where powershell >nul 2>&1 || goto :missing_powershell

if not exist package.json (
  echo [ERROR] package.json was not found. Run this file from the CodeCrafter repository root.
  goto :fail
)

set "DIRTY="
for /f "delims=" %%G in ('git status --porcelain 2^>nul') do set "DIRTY=1"

if defined DIRTY (
  echo [1/7] Local changes detected. Git sync is being skipped so this script cannot overwrite your work.
  echo       Review git status manually if these are unexpected.
) else (
  echo [1/7] Syncing local main with GitHub...
  git fetch origin || goto :fail
  git checkout main || goto :fail
  git pull --ff-only origin main || goto :fail
)

echo.
echo [2/7] Installing exact dependencies...
call npm ci || goto :fail

echo.
echo [3/7] Running TypeScript checks...
call npm run lint || goto :fail

echo.
echo [4/7] Building prerendered production site and running SEO regression checks...
call npm run build || goto :fail

echo.
echo [5/7] Applying Cloudflare SEO response-header hardening...
echo       If CLOUDFLARE_API_TOKEN is not already set, PowerShell will ask for it securely.
powershell -NoProfile -ExecutionPolicy Bypass -File "scripts\cloudflare-seo-hardening.ps1" -PurgeCache
if errorlevel 1 goto :cloudflare_fail

echo.
echo [6/7] Running live production SEO audit...
call npm run seo:audit:production
if errorlevel 1 (
  echo.
  echo [WARNING] The live audit is not fully green yet.
  echo This commonly means the latest GitHub commit has not finished deploying on Cloudflare,
  echo or a Cloudflare hosting/route/header setting still needs to be corrected.
  echo Use the Codex desktop prompt copied to your clipboard in the next step, then run this CMD again.
) else (
  echo [OK] Live production SEO audit passed.
)

echo.
echo [7/7] Preparing the remaining account-level work...
if exist "docs\CODEX-SEO-CONSOLE-PROMPT.md" (
  type "docs\CODEX-SEO-CONSOLE-PROMPT.md" | clip
  echo [OK] Codex desktop prompt copied to clipboard.
) else (
  echo [WARNING] docs\CODEX-SEO-CONSOLE-PROMPT.md was not found.
)

start "" "https://search.google.com/search-console/"
start "" "https://dash.cloudflare.com/"

echo.
echo ============================================================
echo   AUTOMATED SEO WORK COMPLETE
echo ============================================================
echo.
echo Next: paste the clipboard prompt into Codex desktop so it can verify
 echo Cloudflare hosting, Cloudflare edge settings and Google Search Console.
echo Then rerun SEO-FULL-DEPLOY.cmd to confirm the live audit is green.
echo.
pause
exit /b 0

:cloudflare_fail
echo.
echo [ERROR] Cloudflare configuration did not complete.
echo If the token was rejected, create a scoped Cloudflare token with:
echo   - Zone / Zone / Read
 echo   - Zone / Transform Rules / Edit
 echo   - Zone / Cache Purge / Purge  ^(optional but used by this CMD^)
echo Scope it only to mosheschwartzberg.com and rerun this file.
goto :fail

:missing_git
echo [ERROR] Git is not installed or not on PATH.
goto :fail

:missing_node
echo [ERROR] Node.js/npm is not installed or not on PATH.
goto :fail

:missing_powershell
echo [ERROR] Windows PowerShell is not available on PATH.
goto :fail

:fail
echo.
echo ============================================================
echo   SEO WORKFLOW STOPPED BECAUSE A REQUIRED STEP FAILED
echo ============================================================
echo.
pause
exit /b 1
