# Portfolio Portal

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion rebuild of the
legacy single-page portfolio. Static export compatible with **GitHub Pages** and
**Vercel**.

## Quick start

```bash
cd portal
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build (static)

```bash
# GitHub Pages (default basePath /portfolio_website)
npm run build

# Vercel / root domain
NEXT_PUBLIC_BASE_PATH="" npm run build
```

Output: `portal/out/` — deploy that folder (or wire GitHub Actions to it).

## Folder structure

```
portal/
├── design-tokens.md          # Color, type, spacing rules
├── next.config.mjs           # static export + basePath
├── public/                   # Static assets (images, future PDFs)
├── src/
│   ├── app/                  # Routes (App Router)
│   │   ├── page.tsx          # Home
│   │   ├── work/             # Experience list + [slug] case studies
│   │   ├── consulting/       # MBA consulting + [slug]
│   │   ├── projects/         # Technical builds
│   │   ├── resources/        # Filterable downloads hub
│   │   ├── ask/              # Full-page chatbot
│   │   └── contact/
│   ├── components/
│   │   ├── ui/               # Button, Card, Tag
│   │   ├── layout/           # NavBar, Footer
│   │   ├── chat/             # ChatInterface, ChatWidget
│   │   └── motion/           # FadeIn / stagger helpers
│   ├── data/                 # ★ Add new content here
│   │   ├── work.ts
│   │   ├── consulting.ts
│   │   ├── projects.ts
│   │   ├── resources.ts
│   │   └── site.ts
│   └── lib/                  # theme, chatbot client, utils
└── README.md
```

## Adding a new case study

1. Open `src/data/work.ts` or `src/data/consulting.ts`
2. Append a `CaseStudy` object (`slug`, `problem`, `approach`, `myRole`, `outcome`, …)
3. Static route `/work/[slug]/` or `/consulting/[slug]/` is generated automatically

## Adding a resource

1. Drop the file into `public/resources/` (e.g. `bp-model.xlsx`)
2. Add an entry in `src/data/resources.ts` with `href: "/resources/bp-model.xlsx"` and `todo: false`

## Chatbot

- Backend remains the existing **Flask + FAISS** service on Render
- Frontend calls `NEXT_PUBLIC_CHATBOT_API_URL` (default: production Render URL)
- Floating widget + `/ask` + “Ask AI about this project” buttons share the same client

Legacy single-page site and `chatbot-api/` stay at the repo root until you cut over GitHub Pages to serve `portal/out`.

## Scripts

| Command        | Purpose              |
|----------------|----------------------|
| `npm run dev`  | Local development    |
| `npm run build`| Static export → `out`|
| `npm run lint` | ESLint               |
