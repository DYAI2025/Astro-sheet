# Repository Guidelines

## Project Structure & Module Organization
- Entry point lives in `index.tsx`, which mounts `App.tsx` and wires translation/config state.
- UI is split across `components/`, each React FC owning a feature (e.g., `AgentsSection.tsx`, `QuizzesPage.tsx`). Reuse utilities from `constants.tsx` and `types.ts` to stay in sync with translations, agent metadata, and shared types.
- Static HTML shell is in `index.html`; Vite configuration sits in `vite.config.ts`; global metadata and theming tokens live in `metadata.json` and CSS custom properties inside components.

## Build, Test, and Development Commands
- `npm install` - install dependencies (Node 18+ recommended).
- `npm run dev` - start Vite dev server with hot reload; add `-- --host` for LAN testing.
- `npm run build` - create an optimized production bundle under `dist/`.
- `npm run preview` - serve the built bundle locally to verify deployment artifacts.

## Coding Style & Naming Conventions
- Use TypeScript, modern React (function components, hooks), and Tailwind-style utility class strings for styling. Indent with two spaces and favor `const` for immutable values.
- Keep component filenames in PascalCase (`SigilPortrait.tsx`), hooks/utilities in camelCase, and translation keys uppercase (`TRANSLATIONS.AGENTS`).
- Respect existing layout primitives (serif classes, `var(--holo-*)` tokens) to maintain the holographic aesthetic. Run `tsc --noEmit` or rely on IDE diagnostics to catch typing issues before pushing.

## Testing Guidelines
- No automated suite exists yet; prioritize smoke-testing through `npm run dev` and regression passes in Chrome + Safari.
- When adding logic-heavy components, scaffold tests with Vitest + React Testing Library under `components/__tests__/` and mirror filenames (`AgentsSection.test.tsx`).
- Screenshot or describe manual verification steps in PRs until automated coverage is introduced.

## Commit & Pull Request Guidelines
- Follow the conventional commit style already in history (`feat: ...`, `fix(styles): ...`, `refactor:`). Keep scopes short and meaningful (`feat: add horoscope parser`).
- Each PR should include: summary of changes, screenshots or short videos for UI tweaks, linked issue/Notion task, and notes on testing performed.
- Rebase onto `main` before opening the PR, ensure `npm run build` passes, and double-check translations when touching `constants.tsx`.

## Security & Configuration Tips
- The project consumes `@google/genai`; read API keys from environment variables (e.g., `.env.local`) rather than hard-coding. Never commit secrets.
- Validate any new third-party copy before merging to keep tone consistent with the Astro agents narrative.
