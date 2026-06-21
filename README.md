# Legal World — Multilingual React/Vite Website

Languages:
- English
- Russian
- Arabic (RTL)
- French
- Chinese
- German

Automatic language detection:
1. Saved manual selection in localStorage
2. Browser/phone preferred language
3. English fallback

Cloudflare Workers build:
- Node.js 22
- Build: `pnpm install --no-frozen-lockfile && pnpm run build`
- Deploy: `pnpm exec wrangler deploy`
- `SKIP_DEPENDENCY_INSTALL=1`
- `PNPM_VERSION=10.11.1`

- Client trust card labels aligned and resized for better readability.

- Trust section headline shortened and reduced to prevent overlap with cards.
