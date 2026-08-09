import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export async function render(pathname = '/') {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const lang = normalizedPath === '/en' || normalizedPath.startsWith('/en/') ? 'en' : 'he';
  const routeWithoutLanguage = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
  const needsSeoPage = !['/', '/portfolio'].includes(routeWithoutLanguage);
  const seoPage = needsSeoPage
    ? (await import('./lib/seoPages.ts')).getSeoPage(normalizedPath, lang)
    : undefined;

  return renderToString(
    <StrictMode>
      <App pathname={pathname} seoPage={seoPage} />
    </StrictMode>,
  );
}
