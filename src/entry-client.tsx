import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

async function start() {
  const pathname = window.location.pathname;
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const lang = normalizedPath === '/en' || normalizedPath.startsWith('/en/') ? 'en' : 'he';
  const routeWithoutLanguage = normalizedPath.replace(/^\/en(?=\/|$)/, '') || '/';
  const needsSeoPage = !['/', '/portfolio'].includes(routeWithoutLanguage);
  const seoPage = needsSeoPage
    ? (await import('./lib/seoPages')).getSeoPage(normalizedPath, lang)
    : undefined;

  const app = (
    <StrictMode>
      <App seoPage={seoPage} />
    </StrictMode>
  );
  const root = document.getElementById('root')!;

  if (root.textContent?.trim()) {
    hydrateRoot(root, app);
  } else {
    createRoot(root).render(app);
  }
}

void start();
