# Design Tokens

Linear / Vercel inspired — restrained, product-like.

## Colors (max 3 active on screen)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `accent` | `#2563EB` | `#3B82F6` | Primary actions, links, focus |
| `ink` / neutrals | Zinc 50–900 | Zinc inverted | Text, borders, surfaces |
| Background | `#FAFAFA` | `#09090B` | Page canvas |

No decorative gradients except an optional hero wash (`accent` at 4–6% opacity).

## Typography

| Role | Family | Weights |
|------|--------|---------|
| Heading | **Outfit** | 500, 600, 700 |
| Body | **Inter** | 400, 500, 600 |

### Scale (px)

12 · 14 · 16 · 20 · 24 · 32 · 48 · 64

Mapped in Tailwind as `text-xs` → `text-6xl` via theme extend.

## Spacing

Strict **8px grid**: 4, 8, 16, 24, 32, 40, 48, 64, 80, 96.

## Radius (exactly 2)

- `sm` → **8px** — buttons, inputs, tags
- `lg` → **16px** — cards, panels, images

## Shadow (exactly 2)

- `rest` — `0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)`
- `lift` — `0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)`

## Motion

- Fade-up: 300–400ms, `easeOut`
- Hover scale: 1.02, 150–200ms
- Page fade: 250–300ms
- Grid stagger: 50–80ms per item
