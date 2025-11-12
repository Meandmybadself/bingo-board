# Bingo board

Bingo Board is a single–page Lit element that draws random bingo numbers, tracks state in `localStorage`, and is now built with a no-bundler TypeScript pipeline so GitHub Pages can serve the compiled output directly from the repo root.

## Prerequisites
- Node.js 18+
- npm 9+ (used for scripts below)

## Scripts
- `npm install` — install dependencies locally.
- `npm run dev` — run `tsc --watch` to continuously emit `dist/*.js` and `types/*.d.ts`.
- `npm run serve` — launch a static server via `python3 -m http.server 4173` so you can preview `index.html` at `http://localhost:4173`.
- `npm run build` — clean `dist`/`types` and produce a fresh one-off build.
- `npm run clean` — remove generated artifacts if you want to force a cold build.

## Local Development Flow
1. Install dependencies with `npm install`.
2. Start the compiler watcher: `npm run dev`.
3. In a second terminal, start the static server: `npm run serve`.
4. Visit `http://localhost:4173` and develop against the compiled files in `dist/`.

## Deployment on GitHub Pages
- GitHub Pages is configured to serve from the repository root, so the committed `index.html`, `dist/`, and `CNAME` files are the live site.
- After making changes, run `npm run build` and include the resulting `dist/` (and `types/` if package consumers need updated declarations) in your commit before pushing to `main`.
- The existing CI workflow runs `npm ci && npm run build` to ensure the build stays reproducible.

## Custom Domain
- `CNAME` in the repo root pins the deployment to `bingo.meandmybadself.com`. Leave it untouched unless the domain changes.
- If you ever need to reconfigure DNS, make sure the GitHub Pages settings continue to point to the root (`/`) and that the domain’s CNAME record resolves to `<username>.github.io`.
