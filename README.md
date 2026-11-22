<div align="center">
  <h1>CodeCrafter</h1>
  <p><strong>Crafting Code, Creating Solutions.</strong></p>
</div>

## About CodeCrafter V2.0

CodeCrafter is Moshe Schwartzberg's bilingual (Hebrew/English) business website for web development, custom software, CRM systems, integrations, and automation. The application uses React and Vite with prerendered HTML for canonical service, location, and portfolio pages.

### What it does

- Presents a strong, branded portfolio homepage with modern styling
- Highlights key services, featured work, and professional offerings
- Enables fast local development with Vite and a lightweight React setup
- Supports easy updates so your portfolio stays current and flexible

### Why this version exists

CodeCrafter V2.0 is about moving beyond a basic template and into a refined digital identity. It is designed to:

- Improve the user experience with a polished brand voice
- Make content easy to manage and showcase
- Offer a faster, more modern development workflow
- Help you present your capabilities clearly to clients, employers, and collaborators

## Production hosting

`mosheschwartzberg.com` is hosted on Cloudflare. DigitalOcean is no longer part of the production hosting path for this site.

## Project structure

- `src/main.tsx` — application entry point
- `src/App.tsx` — top-level app layout
- `src/components/` — reusable page sections like Hero, Services, Portfolio, and Footer
- `src/index.css` — global styling
- `amitStarProject/` — separate static Vite/React art-gallery project with Firebase/Firestore backend support, built into `dist/amitStarProject/` as part of the Cloudflare-hosted production bundle

## Run locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`
3. Open the local URL shown in your terminal to preview CodeCrafter V2.0

## Customize your site

- Edit content in `src/components/Hero.tsx`, `Services.tsx`, and `Portfolio.tsx`
- Update branding, copy, and visuals to match your personal or business identity
- Add new sections or portfolio items to grow the site with your work

## Build for production

Run:

`npm run lint && npm run build && npm test && npm run test:e2e`

The build prerenders the public routes, generates the XML sitemap, and runs SEO validation. Browser tests require Playwright Chromium to be installed (`npx playwright install chromium`).

**GitHub Actions has been removed by request.** Run these checks locally before pushing or deploying. The production build is served through Cloudflare Pages behind the existing routed Cloudflare Worker; a successful GitHub push is not proof that production has updated.
