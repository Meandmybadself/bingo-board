# Repository Guidelines

## Project Structure & Module Organization
- `index.html` loads the compiled `<bingo-board>` module from `dist/bingo-board.js`; keep this file lean so GitHub Pages can serve it verbatim.
- Authoring happens in `src/` (`bingo-board.ts` + `bingo-board.styles.ts`). Build output belongs in `dist/`, while declaration files stay in `types/`.
- Static assets live under `src/assets/`; reference them with relative URLs so the watcher copies them as-is.
- `CNAME` must remain at the repo root to keep the custom domain wired up.

## Build, Test, and Development Commands
- `npm install` — install dependencies (lit, lodash, TypeScript).
- `npm run dev` — run `tsc --watch`, regenerating `dist/` + `types/` on every save.
- `npm run serve` — start `python3 -m http.server 4173` and visit `http://localhost:4173` to preview the committed files.
- `npm run build` — clean and emit a one-off build; commit the refreshed `dist/` before merging.

## Coding Style & Naming Conventions
- Stick to TypeScript + ES modules with 2-space indentation and arrow functions; private members stay prefixed with `_`.
- Lit components use PascalCase classes and dash-cased tags (`BingoBoard`/`bingo-board`); keep styles centralized in `bingo-board.styles.ts`.
- When touching persistent keys (`set`, `markedNumbers`, `currentLetterNumber`), update `_persistState` and cold-start logic together.
- Favor template readability: each `html\`\`` block should stay under ~120 columns and wrap nested maps clearly.

## Testing Guidelines
- No harness exists yet; when adding one, colocate specs under `src/__tests__/` and stub randomness/localStorage to keep tests deterministic.
- Validate: draw sequence uniqueness, state reloads after refresh, fullscreen toggling, and help-modal interactions.
- Document manual spot-checks in PRs until automated coverage lands.

## Commit & Pull Request Guidelines
- Write short, imperative commit subjects (`Switch build to tsc`, `Add CNAME`); avoid trailing punctuation.
- PRs should call out what changed, how it was tested (`npm run build`, manual browser steps), and include screenshots for UI tweaks.
- Mention if `dist/` or `types/` were regenerated so reviewers know to skim the compiled artifacts.

## State Persistence & Safety Tips
- The board caches progress in `localStorage`; null-check values before parsing to avoid exceptions in Safari private windows.
- Never store secrets—everything in this repo is client-side and deployed verbatim via GitHub Pages.
