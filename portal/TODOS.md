# TODOs — content you still need to supply

Do not invent metrics or files. Items below are flagged in code with `TODO` comments.

## Files / links

| Item | Where to put it | Data entry |
|------|-----------------|------------|
| Resume PDF | `portal/public/resume.pdf` | `resources.ts` (`resume-pdf`), Contact page |
| BP Excel models | `portal/public/resources/` | `resources.ts` → `bp-excel-models` |
| BP Word appendices | `portal/public/resources/` | `bp-word-appendices` |
| BP PowerPoint deck | `portal/public/resources/` | `bp-deck` |
| V-Lab Australia Excel | `portal/public/resources/` | `vlab-australia-model` |
| V-Lab market reports (PDF) | `portal/public/resources/` | `vlab-market-reports` |
| Salud.ai presentation | `portal/public/resources/` | `salud-presentation` |
| Neo public GitHub URL | — | `projects.ts` + `resources.ts` (`neo-repo`) |
| MyAgentcore public GitHub URL | — | `projects.ts` + `resources.ts` |

## Case study copy

| Entry | Issue |
|-------|--------|
| **DKPR E-Learn** (`work.ts`) | Problem / approach / role / outcome are placeholders — fill with real contributions |
| Project screenshots / diagrams | Optional `images[]` on case studies — add WebP under `public/images/` when ready |

## Deploy cutover

| Decision | Notes |
|----------|--------|
| Point GitHub Pages at `portal/out` | Or use Vercel with `NEXT_PUBLIC_BASE_PATH=""` |
| Keep / remove legacy `index.html` | Root static site still exists alongside `portal/` |
| Chatbot API | Kept on Render; only change if you want Next.js API routes later |

## Optional polish

- Convert `profile.jpg` to WebP and update Contact/About if you add a photo section
- Wire real GitHub URLs for Finbot / AgentCore if public
- Confirm WhatsApp / YouTube URLs still preferred on Contact
