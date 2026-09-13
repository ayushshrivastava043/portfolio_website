# Design tokens (portal CSS)

Source of truth: `assets/css/portfolio-redesign.css` `:root` + `html.theme-light`.

## Colors (≤3 active on screen)

| Role | Token | Dark | Light |
|------|-------|------|-------|
| Primary | `--color-primary` | `#38bdf8` | `#0284c7` |
| Text | `--color-text` / `--color-text-muted` | neutrals | neutrals |
| Surfaces | `--color-bg` / `--color-surface` | neutrals | neutrals |

No purple/pink accent. Legacy `--accent` bridges to `--color-primary`.

## Typography (exactly 2)

- Headings: **Sora** (`--font-heading`)
- Body: **Albert Sans** (`--font-body`)

## Spacing (8px grid)

`--space-1` … `--space-8` → 8 / 16 / 24 / 32 / 40 / 48 / 64px  
Legacy `--space-sm` etc. alias into this scale.

## Radius (exactly 2)

- `--radius-sm` → 8px  
- `--radius-lg` → 16px  
- `--radius-md` aliases to `--radius-sm`

## Shadow (exactly 2)

- `--shadow-rest`  
- `--shadow-lift`  

## Theme

`html.theme-light` / `body.theme-light` via nav **Theme** toggle (`localStorage` key `portal-theme`).

## Gradients

Only `--hero-wash` on the home hero glow. No multi-stop brand gradients elsewhere.
