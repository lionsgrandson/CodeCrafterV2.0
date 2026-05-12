# Amit Start Project

`amitStartProject` is a separate Vite/React art-gallery site inside the main CodeCrafter repository. It is built as a static deployable app and uses Firebase/Firestore as its backend for visitor star selections.

## Deployment model

- Hosting target: DigitalOcean Static Site
- Build command: `npm install && npm run build`
- Output directory: `dist`
- Backend: Firebase/Firestore, reached from the browser after the static app loads

The project is intended to stay static-host friendly. There is no long-running Node server required in production, so DigitalOcean only needs to pull the repository, install dependencies, build once, and serve the generated files from `dist`.

## Rendering note

For static hosting, treat this as an SSR/SSG-style deployment boundary: page assets are built once during the DigitalOcean build, while live visitor interactions continue to use Firebase from the client. This keeps the deployment compatible with a DO static website while still allowing the app to use a backend.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
