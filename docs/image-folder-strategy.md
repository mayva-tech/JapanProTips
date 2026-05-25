# Image folder strategy

JapanProTips stores static images under `public/images/`. Paths are served as `/images/...` in Next.js.

This layout scales to 100+ guide, resident, tool, and article pages. **Do not delete legacy folders** (`hero/`, flat `guides/` files, root logo) until migration is verified. See [image-inventory.md](./image-inventory.md) and the cleanup list at the bottom of this doc.

## Folder structure

```
public/images/
  brand/           # Logo, favicon, dark variants
  ui/              # Nav icons, generic placeholders
  shared/          # Reusable editorial photos (Suica, trains, conbini, etc.)
  guides/[slug]/   # One folder per /guides/[slug] route
  residents/[slug]/ # One folder per /residents/[slug] route
  tools/[slug]/    # One folder per /tools/[slug] route
  field-notes/[slug]/  # Optional assets for Field Note blocks (when needed)
  articles/[slug]/ # Only for future /articles/[slug] routes (not tourist guides)
  diagrams/      # Site-wide or topic diagrams
  og/              # Open Graph images by category + slug
    guides/
    residents/
    tools/
    articles/
```

## Naming rules

1. **Folder slugs** must match the URL slug: `/guides/suica-pasmo-guide` → `public/images/guides/suica-pasmo-guide/`.
2. **Filenames** use lowercase kebab-case: `hero.webp`, `main-photo.webp`, `section-01.webp`, `step-01.webp`, `diagram.webp`, `map.webp`.
3. **Prefer WebP** for photos. Until final art exists, `.jpg` placeholders copied from legacy assets are acceptable.
4. **Do not** use camera names (`IMG_1234.JPG`), generic names (`image1.png`), or title case.
5. **Tourist guides** go under `guides/`, not `articles/`, unless the route is literally `/articles/[slug]`.

## Per-page slots

### Guides and residents

| File | Use |
| --- | --- |
| `hero.webp` | Page hero, card thumbnail, OG fallback |
| `main-photo.webp` | Lead in-article image |
| `section-01.webp`, `section-02.webp` | Section breaks |
| `step-01.webp`, `step-02.webp` | How-to steps |
| `diagram.webp` | Optional inline diagram |
| `map.webp` | Optional map |

### Tools

| File | Use |
| --- | --- |
| `hero.webp` | Tool landing hero |
| `tool-preview.webp` | Card / hub preview |
| `screenshot-01.webp`, `screenshot-02.webp` | UI captures |

### Field notes (optional)

| File | Use |
| --- | --- |
| `hero.webp`, `main-photo.webp` | Note header art |
| `detail-01.webp`, `detail-02.webp` | Inline detail shots |

Create `field-notes/[slug]/` only when a note needs dedicated art. Slug should match the parent page or a stable note id.

## Shared images

Reusable assets live in `public/images/shared/`:

- `suica-card.webp`
- `train-ticket-gate.jpg` (placeholder)
- `train-platform.jpg` (placeholder)
- `convenience-store.jpg`, `coin-locker.jpg`, `seven-bank-atm.jpg`, etc.

Use shared images when the same photo appears on many pages (money guides, train guides). Use per-slug folders when the image is page-specific.

## OG images

Open Graph images: `public/images/og/{category}/{slug}.webp`

Examples:

- `/guides/narita-to-tokyo` → `public/images/og/guides/narita-to-tokyo.jpg` (placeholder)
- `/tools/japan-itinerary-planner` → `public/images/og/tools/japan-itinerary-planner.jpg`

Wire in page metadata when ready:

```tsx
import { ogImagePath } from "@/lib/images";

openGraph: {
  images: [{ url: ogImagePath("guides", "narita-to-tokyo", "webp") }],
},
```

## Diagrams

- **Flat topic files:** `public/images/diagrams/japan-map.jpg`, `airport-route.jpg`
- **Page-specific:** `public/images/diagrams/narita-to-tokyo/diagram.jpg`
- PDFs (e.g. JR route) stay as `.pdf` in `diagrams/`

## Adding images for a new guide

1. Add the route under `app/guides/[slug]/page.tsx` and register in `lib/tourist-guides.ts`.
2. Create `public/images/guides/[slug]/` with at least `hero`, `main-photo`, `section-01`, `section-02`.
3. Add `public/images/og/guides/[slug].webp` for social sharing.
4. Reference in code via helpers in `lib/images.ts` or direct paths.

## Next.js Image example

```tsx
import Image from "next/image";
import { pageImagePath } from "@/lib/images";

const slug = "suica-pasmo-guide";

<Image
  src={pageImagePath("guides", slug, "hero.webp")}
  alt="Suica and Pasmo cards at a Tokyo station"
  width={1200}
  height={630}
  className="hero-image object-cover"
  priority
/>
```

For shared assets:

```tsx
import { IMAGES } from "@/lib/images";

<Image src={IMAGES.shared.suicaCard} alt="Suica IC card" width={800} height={533} />
```

## Code helpers

`lib/images.ts` exports:

- `IMAGES` — shared paths and legacy aliases (`hero`, `guides`, `diagrams`) used by hub cards
- `pageImagePath(category, slug, filename)` — per-page files
- `ogImagePath(category, slug, ext)` — OG URLs

## Setup script

Regenerate folders and placeholders (non-destructive; skips existing copies):

```bash
node scripts/setup-image-folders.mjs
```

Updates `docs/image-inventory.md`.

## Legacy cleanup (later)

After `npm run build` and visual QA, these may be removed:

| Legacy path | Migrated to |
| --- | --- |
| `public/images/hero/*` | `shared/`, per-guide folders |
| `public/images/guides/guides-*` | Per-guide folders |
| `public/images/articles/*` | `guides/japan-airport-to-city/` |
| `public/images/suica/*` | `guides/suica-*` |
| `public/images/japanprotips-logo.png` | `brand/japanprotips-logo.png` |
| `public/images/nav-search-icon.png` | `ui/nav-search-icon.png` |
| `public/images/diagrams/diagrams-*` | `diagrams/{name}.jpg` (keep until refs updated) |

**Do not delete** until no code or content references the old paths.
