import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

const root = document.getElementById('root')!;

if (root.textContent?.trim()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
