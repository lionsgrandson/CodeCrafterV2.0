import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { translations } from '../src/lib/translations.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const templatePath = path.join(distDir, 'index.html');
const serverEntryPath = path.join(distDir, 'server', 'entry-server.js');

const template = await readFile(templatePath, 'utf-8');
const { render } = await import(pathToFileURL(serverEntryPath).href);

const portfolioUrl = 'https://mosheschwartzberg.com/portfolio/';
const portfolioTitle = 'כל העבודות שלנו | CodeCrafter';
const portfolioDescription =
  'כל הפרויקטים של CodeCrafter: אתרים, מערכות וחוויות דיגיטליות שנבנו לעסקים, ארגונים ויוצרים בישראל ובעולם.';

function escapeAttribute(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function replaceMeta(
  html: string,
  attribute: 'name' | 'property',
  key: string,
  content: string,
) {
  const pattern = new RegExp(
    `<meta\\s+${attribute}="${key}"[\\s\\S]*?\\/?>`,
    'i',
  );

  return html.replace(
    pattern,
    `<meta ${attribute}="${key}" content="${escapeAttribute(content)}" />`,
  );
}

function createPortfolioDocument(html: string) {
  const portfolioSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${portfolioUrl}#portfolio`,
    url: portfolioUrl,
    name: portfolioTitle,
    description: portfolioDescription,
    inLanguage: ['he', 'en'],
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://mosheschwartzberg.com/#website',
      name: 'CodeCrafter',
      url: 'https://mosheschwartzberg.com/',
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: translations.he.portfolio.projects.length,
      itemListElement: translations.he.portfolio.projects.map(
        (project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'CreativeWork',
            name: project.title,
            url: project.link,
          },
        }),
      ),
    },
  };

  let portfolioHtml = html.replace(
    /<title>[\s\S]*?<\/title>/i,
    `<title>${portfolioTitle}</title>`,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'name',
    'title',
    portfolioTitle,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'name',
    'description',
    portfolioDescription,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'og:url',
    portfolioUrl,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'og:title',
    portfolioTitle,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'og:description',
    portfolioDescription,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'twitter:url',
    portfolioUrl,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'twitter:title',
    portfolioTitle,
  );
  portfolioHtml = replaceMeta(
    portfolioHtml,
    'property',
    'twitter:description',
    portfolioDescription,
  );
  portfolioHtml = portfolioHtml.replace(
    /<link\s+rel="canonical"[\s\S]*?\/>/i,
    `<link rel="canonical" href="${portfolioUrl}" />`,
  );
  portfolioHtml = portfolioHtml.replace(
    /<link\s+rel="alternate"\s+hreflang="(en|he|x-default)"[\s\S]*?\/>/gi,
    (_match, hreflang) =>
      `<link rel="alternate" hreflang="${hreflang}" href="${portfolioUrl}" />`,
  );
  portfolioHtml = portfolioHtml.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(portfolioSchema)}</script>`,
  );

  return portfolioHtml;
}

const homeHtml = template.replace('<!--app-html-->', render('/'));
const portfolioHtml = createPortfolioDocument(
  template.replace('<!--app-html-->', render('/portfolio/')),
);
const portfolioDir = path.join(distDir, 'portfolio');

await mkdir(distDir, { recursive: true });
await mkdir(portfolioDir, { recursive: true });
await writeFile(templatePath, homeHtml);
await writeFile(path.join(portfolioDir, 'index.html'), portfolioHtml);
await rm(path.join(distDir, 'server'), { recursive: true, force: true });

console.log('Prerendered / and /portfolio/');
