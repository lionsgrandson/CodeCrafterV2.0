/**
 * Read a <meta name="..."> content attribute without confusing an apostrophe
 * inside a double-quoted HTML value for the end of that value.
 * HTML escaping is handled by the prerenderer; this function inspects its output.
 */
export function readMetaContent(html, name) {
  for (const tag of html.match(/<meta\b[^>]*>/gi) ?? []) {
    const attributes = new Map()
    for (const match of tag.matchAll(/\b([a-z][\w:-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
      attributes.set(match[1].toLowerCase(), match[2] ?? match[3])
    }
    if (attributes.get('name')?.toLowerCase() === name.toLowerCase()) {
      return (attributes.get('content') ?? '').trim()
    }
  }
  return ''
}
