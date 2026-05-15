# Cursor Task — Maison Omakase Homepage Refactor
## Stack: Next.js (App Router) + Tailwind CSS
## Reference style: Art of Manliness (artofmanliness.com) — see attached screenshots

You are a senior frontend engineer. Do NOT redesign creatively. Implement exactly what is described below. Every value is specified. Do not invent, substitute, or add anything not listed.

---

## FONTS

Add to `app/layout.tsx` (or wherever the global font is configured):

```tsx
import { Bebas_Neue, Lora, Source_Sans_3 } from 'next/font/google'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-sans',
})
```

Apply all three variables to `<body>`:
```tsx
<body className={`${bebasNeue.variable} ${lora.variable} ${sourceSans.variable}`}>
```

Add to `tailwind.config.ts` under `theme.extend.fontFamily`:
```ts
fontFamily: {
  display: ['var(--font-display)', 'Impact', 'sans-serif'],
  serif:   ['var(--font-serif)', 'Georgia', 'serif'],
  sans:    ['var(--font-sans)', 'sans-serif'],
},
```

Add to `tailwind.config.ts` under `theme.extend.colors`:
```ts
colors: {
  cream:   '#f0ebe0',
  maroon:  '#7a1f1f',
  rust:    '#a0390f',
  tan:     '#c8a96e',
  dark:    '#1a1a1a',
  muted:   '#5a5a5a',
}
```

---

## `app/page.tsx` — FULL FILE

Replace the entire file with exactly this:

```tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="bg-cream min-h-screen font-sans">

      {/* ── 1. HERO ── */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        {/* Section label — AoM style: all-caps rust text + /// slashes */}
        <p className="font-display text-rust text-2xl tracking-widest mb-2">
          START HERE ///
        </p>
        <h1 className="font-display text-dark leading-none tracking-wide mb-4"
            style={{ fontSize: 'clamp(48px, 8vw, 88px)' }}>
          JAPAN TRAVEL,<br />EXPLAINED WITHOUT THE BS.
        </h1>
        <p className="font-serif text-muted text-lg leading-relaxed max-w-xl mb-8">
          Clear, practical guides for planning your trip to Japan. No fluff. No sponsored recommendations.
        </p>
        {/* ONE button only — AoM style: solid dark rectangle, caps, tight tracking */}
        <Link
          href="/start-here"
          className="inline-block bg-maroon text-white font-sans font-bold text-sm tracking-widest uppercase px-8 py-4 hover:bg-rust transition-colors duration-150"
        >
          Start Here
        </Link>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t-2 border-dark" />
      </div>

      {/* ── 2. START HERE SECTION ── */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <p className="font-display text-rust text-xl tracking-widest mb-1">
          PLANNING A TRIP ///
        </p>
        <h2 className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}>
          START HERE IF YOU'RE PLANNING A TRIP
        </h2>
        {/* AoM uses clean left-aligned prose, not fancy bullets */}
        <ul className="font-serif text-muted text-base leading-loose mb-8 space-y-1 list-none pl-0">
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            First time in Japan?
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Not sure what to book?
          </li>
          <li className="before:content-['›'] before:text-rust before:font-bold before:mr-3">
            Confused by SIMs, trains, or payments?
          </li>
        </ul>
        <Link
          href="/start-here"
          className="inline-block border-2 border-dark text-dark font-sans font-bold text-sm tracking-widest uppercase px-7 py-3 hover:bg-dark hover:text-cream transition-colors duration-150"
        >
          Read the Start Here Guide
        </Link>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-tan" />
      </div>

      {/* ── 3. FEATURED GUIDE ── */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <p className="font-display text-rust text-xl tracking-widest mb-1">
          FEATURED GUIDE ///
        </p>
        <h2 className="font-display text-dark tracking-wide mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
          MOST IMPORTANT GUIDE RIGHT NOW
        </h2>

        {/* AoM card style: white bg, no rounded corners, thin border, image on top */}
        <div className="bg-white border border-[#d4c9b0] overflow-hidden">
          {/* Placeholder image strip — same tan color as AoM's illustrated cards */}
          <div className="w-full h-48 bg-tan flex items-center justify-center">
            <span className="font-display text-white tracking-widest text-2xl opacity-60">
              SIM CARD GUIDE
            </span>
          </div>
          <div className="p-7">
            {/* Category tag — AoM style: maroon background, white text, tight tracking */}
            <span className="inline-block bg-maroon text-white font-sans font-bold text-xs tracking-widest uppercase px-3 py-1 mb-4">
              Trip Prep
            </span>
            <h3 className="font-display text-dark tracking-wide leading-tight mb-3"
                style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              BEST SIM CARD FOR JAPAN (2026)
            </h3>
            <p className="font-serif text-muted text-base leading-relaxed mb-6">
              What actually works, what to avoid, and the best option depending on your trip.
            </p>
            {/* AoM "FULL ARTICLE >>>" link style */}
            <Link
              href="/guides/sim-card-japan"
              className="inline-flex items-center gap-2 font-sans font-bold text-sm tracking-widest uppercase text-rust hover:text-maroon transition-colors duration-150"
            >
              Read the Guide <span className="text-base">›››</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-tan" />
      </div>

      {/* ── 4. TRUST BLOCK ── */}
      {/* AoM uses a dark card for newsletter/trust blocks — mirrored here */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-dark px-8 py-10">
          <p className="font-display text-tan text-xl tracking-widest mb-2">
            WHY THIS SITE EXISTS ///
          </p>
          <h2 className="font-display text-cream tracking-wide mb-5"
              style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            JAPAN INFO FROM SOMEONE WHO LIVES HERE.
          </h2>
          <p className="font-serif text-[#aab4be] text-base leading-relaxed max-w-2xl">
            Most Japan guides are outdated, generic, or written for SEO. This site is built by someone living in Japan, focused on what actually matters when you're planning a trip.
          </p>
          {/* AoM-style horizontal rule inside dark block */}
          <div className="border-t border-[#3a3a3a] mt-6 pt-6">
            <p className="font-sans text-[#667788] text-xs font-bold tracking-widest uppercase">
              No ads. No sponsored posts. If something is recommended here, it works.
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. FOOTER ── */}
      <footer className="border-t-2 border-dark bg-cream">
        <div className="max-w-4xl mx-auto px-6 py-8 flex items-center justify-between flex-wrap gap-4">
          <span className="font-display text-dark tracking-wide text-xl">
            MAISON OMAKASE
          </span>
          <span className="font-serif text-muted text-sm italic">
            Practical Japan guides. No fluff.
          </span>
        </div>
      </footer>

    </main>
  )
}
```

---

## NAVBAR — `components/Navbar.tsx` (or wherever nav lives)

Replace nav link list with ONLY these two links. Remove everything else.

```tsx
<nav>
  <Link href="/">Home</Link>
  <Link href="/start-here">Start Here</Link>
  {/* Add this ONLY if /guides/sim-card-japan page already exists: */}
  {/* <Link href="/guides/sim-card-japan">SIM Guide</Link> */}
</nav>
```

**Remove ALL of the following nav items — no exceptions:**
- Tourist Guides
- Resident Guides
- Resources
- Newsletter
- Any social links (TikTok, YouTube, etc.)
- Any `href="#"` links anywhere on the page

---

## STYLE RULES — Tailwind only

| Token | Value |
|---|---|
| Background | `bg-cream` → `#f0ebe0` |
| Primary text | `text-dark` → `#1a1a1a` |
| Muted text | `text-muted` → `#5a5a5a` |
| Accent / CTA | `bg-maroon` → `#7a1f1f` |
| Hover accent | `hover:bg-rust` → `#a0390f` |
| Link color | `text-rust` → `#a0390f` |
| Border | `border-[#d4c9b0]` |
| Dark block bg | `bg-dark` → `#1a1a1a` |
| Section headers | `font-display` (Bebas Neue) |
| Body / deck text | `font-serif` (Lora) |
| Labels / buttons / nav | `font-sans` (Source Sans 3) |

**Do NOT add:**
- `border-radius` / `rounded-*` on cards or buttons (AoM uses hard edges)
- `shadow-*` drop shadows
- Gradients
- Icons (unless already present in codebase)
- Any `href="#"` placeholder links

---

## CRITICAL REMOVALS CHECKLIST

Before submitting, verify:

- [ ] Zero `href="#"` links remain on the page
- [ ] Zero placeholder sections remain (no "Coming Soon", no empty cards)
- [ ] Exactly ONE primary CTA exists: the maroon "Start Here" button in the hero
- [ ] No duplicate "Read more" links
- [ ] No sections beyond the 5 listed above
- [ ] Nav has maximum 2 links (3 only if SIM guide page confirmed to exist)
- [ ] `font-display` (Bebas Neue) used for ALL section labels and headlines
- [ ] `font-serif` (Lora) used for ALL paragraph / deck / body text
- [ ] `font-sans` (Source Sans 3) used for ALL buttons, labels, nav items

---

## AoM VISUAL PATTERNS TO REPLICATE (from screenshots)

These are not optional — they define the editorial feel:

1. **Section labels**: `FONT-DISPLAY text-rust tracking-widest` followed by ` ///` — e.g. `THE LATEST ///`, `GET CHARACTER ///`. Every section gets one.
2. **Headlines**: All-caps, Bebas Neue, no letter-spacing tightening (Bebas is already condensed). Dark color `#1a1a1a`.
3. **Cards**: White background, `border border-[#d4c9b0]`, NO rounded corners, category tag in maroon pill above the title.
4. **"Full Article" links**: `font-sans font-bold text-rust tracking-widest uppercase` + ` ›››` chevrons (not arrows).
5. **Dark trust/newsletter block**: `bg-dark` full-width-within-container, cream and tan text inside.
6. **Dividers**: `border-t-2 border-dark` for major section breaks, `border-t border-tan` for minor ones.
7. **No images needed** — use the tan placeholder strip on the featured card until real images exist.

---

## OUTPUT

Return only:
1. `app/page.tsx` — full file, production-ready
2. Any changes needed to `app/layout.tsx` for font variables
3. Any changes needed to `tailwind.config.ts` for font and color tokens
4. The updated nav component with removed links

No explanation unless something in the existing codebase conflicts with this spec.
