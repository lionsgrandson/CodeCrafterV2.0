import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readMetaContent } from '../scripts/seo-meta-utils.mjs'

test('parses the original Hebrew CRM guide description with an apostrophe', () => {
  const description = "צ'קליסט לפני פיתוח CRM: לידים, לקוחות, צוותים והרשאות, ייבוא נתונים, אוטומציות, אינטגרציות ואמינות המערכת."
  const html = `<html><head><meta name="description" content="${description}" /></head></html>`
  assert.equal(readMetaContent(html, 'description'), description)
  assert.ok(readMetaContent(html, 'description').length > 70)
})

test('respects the actual quoted attribute delimiter, not the other quote type', () => {
  const doubleQuoted = `<meta name="description" content="Don't prematurely terminate this description" />`
  const singleQuoted = `<meta content='A "quoted" phrase in a single-quoted attribute' name='description'>`
  assert.equal(readMetaContent(doubleQuoted, 'description'), "Don't prematurely terminate this description")
  assert.equal(readMetaContent(singleQuoted, 'description'), 'A "quoted" phrase in a single-quoted attribute')
})

test('reads the right meta name independently of attribute order and whitespace', () => {
  const html = `<meta name="robots" content="index, follow"><meta content="  A meaningful description with apostrophe's punctuation  " name="description">`
  assert.equal(readMetaContent(html, 'description'), "A meaningful description with apostrophe's punctuation")
  assert.equal(readMetaContent(html, 'robots'), 'index, follow')
  assert.equal(readMetaContent(html, 'missing'), '')
})
