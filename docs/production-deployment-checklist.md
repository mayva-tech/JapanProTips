# Production deployment checklist

Use this list when deploying Japan ProTips to Vercel (or similar) at **https://japanprotips.com**. No new features required for launch; focus on env, SEO, analytics, and spot checks.

**Last verification:** 2026-05-20 (`npm run audit:affiliate`, `npx tsc --noEmit`, `npm run build` all passed).

---

## 1. Vercel environment variables

Copy from [`.env.example`](../.env.example) and set in **Project → Settings → Environment Variables** for **Production** (and Preview if you want analytics on previews).

| Variable | Required | Example / notes |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | **Yes** | `https://japanprotips.com` (no trailing slash). Drives sitemap, `robots.txt`, page canonicals, and JSON-LD URLs via `siteUrl()` in `lib/site.ts`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Recommended | GA4 measurement ID, e.g. `G-XXXXXXXXXX`. Omit to disable GA4 (component returns null). |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional | Clarity project ID. Omit to disable Clarity. |

**Fallback behavior:** If `NEXT_PUBLIC_SITE_URL` is unset, `siteUrl()` uses `VERCEL_URL` on Vercel previews, else the hardcoded `SITE_URL` constant (`https://japanprotips.com`) in `lib/site.ts`. **Always set** `NEXT_PUBLIC_SITE_URL` in production so sitemap and canonicals never point at a `*.vercel.app` host.

**Do not** commit `.env.local` with real IDs to git.

---

## 2. Domain setup (Vercel)

1. Add custom domain `japanprotips.com` (and `www.japanprotips.com` if used) in Vercel → Domains.
2. Point DNS per Vercel instructions (A/CNAME).
3. Set primary domain and redirect `www` → apex (or your chosen canonical host).
4. Confirm SSL certificate is active.
5. Set production env `NEXT_PUBLIC_SITE_URL=https://japanprotips.com` **before** or immediately after first production deploy.

---

## 3. SEO files (verified in repo)

| File | Source | Production URL |
| --- | --- | --- |
| Sitemap | `app/sitemap.ts` | `https://japanprotips.com/sitemap.xml` |
| Robots | `app/robots.ts` | `https://japanprotips.com/robots.txt` |

- Sitemap lists static paths including `/tools`, all five tool slugs, `/residents`, key guides, and `/resources/moving-to-japan-checklist`.
- `robots.txt` allows all user agents and references the sitemap URL from `siteUrl()`.
- Root `metadataBase` in `app/layout.tsx` uses `SITE_URL` (`https://japanprotips.com`).
- Per-page `metadata.alternates.canonical` and JSON-LD use `siteUrl()` at build/request time.

**Post-deploy check:** Open `/sitemap.xml` and confirm every `loc` starts with `https://japanprotips.com`, not a preview host.

---

## 4. Build and audit (run before every production deploy)

```bash
npm run audit:affiliate
npx tsc --noEmit
npm run build
```

| Check | Expected at pre-affiliate launch |
| --- | --- |
| Typecheck | Exit 0 |
| Build | Exit 0, static routes generated |
| Affiliate audit | 0 unknown link IDs; 2 live URLs (`airalo-esim-japan`, `ubigi-esim-japan`); remaining keys placeholder until partner URLs added |

---

## 5. Route smoke test (build output)

These routes compiled as static pages in the last production build:

| Route | Status |
| --- | --- |
| `/` | OK |
| `/tools` | OK |
| `/tools/japan-trip-budget-calculator` | OK |
| `/tools/japan-packing-generator` | OK |
| `/tools/can-i-bring-this-to-japan` | OK |
| `/tools/japanese-address-formatter` | OK |
| `/tools/japan-monthly-cost-calculator` | OK |
| `/residents` | OK |
| `/residents/japan-living-cost` | OK |
| `/guides/sim-card-japan` | OK |
| `/guides/japan-packing-list` | OK |
| `/resources/moving-to-japan-checklist` | OK |

**Post-deploy:** Open each URL on production and confirm 200, navbar, and no console errors.

**Dev-only routes** (`/dev/*`) return 404 in production (`notFound()` when `NODE_ENV === "production"`).

---

## 6. Analytics readiness

### GA4 (`components/GoogleAnalytics.tsx`)

- Scripts load **only** when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.
- Page views sent on route change (`send_page_view: false` on initial config; manual `page_path` updates).
- Custom `click` events via `lib/gtag-events.ts` (`trackGtagClick`).

### Clarity (`components/MicrosoftClarity.tsx`)

- Script loads **only** when `NEXT_PUBLIC_CLARITY_PROJECT_ID` is set.
- Uses `lazyOnload` strategy.

### Tracked link attributes (verify in DevTools after deploy)

| Label pattern | Where to inspect |
| --- | --- |
| `tool_click:{source}:{toolSlug}` | `data-cta-label` on `TrackedToolLink` (navbar Tools, homepage tool strip, `/tools` cards) |
| `resident_starter:{source}:{slug}` | `data-cta-label` on `ResidentStarterPath` / `HomeResidentCta` |
| `recommendation_click:{context}:{id}` | `data-recommendation-id`, `data-recommendation-context`, `data-cta-label` on recommendation CTAs |

See [`docs/analytics-tracking-checklist.md`](analytics-tracking-checklist.md) for GA4 Realtime steps.

---

## 7. Post-deploy GA4 checks

1. Install [Google Analytics Debugger](https://chrome.google.com/webstore) or use **Admin → DebugView**.
2. Visit production homepage with ad blocker off.
3. Confirm `page_view` (or config hit with `page_path`) for `/`.
4. Click **Tools** in navbar → `click` event, label `tool_click:nav:tools`.
5. From `/residents`, click a starter-path card → `resident_starter:residents-hub:moving-to-japan-checklist` (or similar).
6. From `/guides/japan-packing-list`, click a recommendation guide fallback → `recommendation_click:japan-packing-list:{id}`.

---

## 8. Post-deploy Clarity checks

1. Open [Clarity](https://clarity.microsoft.com/) → your project → **Setup** → confirm tag status **Receiving data** (may take 15–30 minutes).
2. Browse 2–3 pages on production.
3. Confirm session recording or heatmap data appears (not required on day one, but tag should show active).

---

## 9. Google Search Console

After DNS and production deploy are stable:

1. Add property `https://japanprotips.com` (domain or URL prefix).
2. Verify ownership (DNS TXT or HTML file).
3. Submit sitemap: `https://japanprotips.com/sitemap.xml`
4. Request indexing for high-intent URLs (optional):

| Priority URL |
| --- |
| `https://japanprotips.com/` |
| `https://japanprotips.com/tools` |
| `https://japanprotips.com/guides/sim-card-japan` |
| `https://japanprotips.com/guides/japan-packing-list` |
| `https://japanprotips.com/guides/japan-airport-first-steps` |
| `https://japanprotips.com/residents` |
| `https://japanprotips.com/resources/moving-to-japan-checklist` |
| `https://japanprotips.com/tools/japan-trip-budget-calculator` |

---

## 10. Top URLs to inspect manually

| URL | What to check |
| --- | --- |
| `/` | Hero, tool strip, resident CTA, guide links |
| `/tools` | Five tool cards, links work |
| `/guides/sim-card-japan` | One affiliate disclosure in gear cluster; Airalo/Ubigi editorial CTAs; no en/em dashes |
| `/guides/japan-packing-list` | Recommendation grid + guide fallbacks |
| `/residents` | Starter path hub cards |
| `/resources/moving-to-japan-checklist` | PDF download, checklist, starter path |
| `/tools/japan-trip-budget-calculator` | Calculator runs, breadcrumb JSON-LD |

---

## 11. Affiliate URL reminder

- Monetization is **not** fully live until partner URLs are added in `lib/affiliate-links.ts`.
- Gear/service preset links show **non-clickable** names while href is `[affiliate-link-here]`.
- Recommendation catalog uses **Read related guide →** fallbacks until URLs are live.
- Editorial eSIM providers use `airalo-esim-japan` and `ubigi-esim-japan` (homepages today; swap for tracked affiliate URLs when ready).
- Run `npm run audit:affiliate` after any URL change.
- See [`docs/affiliate-readiness-checklist.md`](affiliate-readiness-checklist.md) and [`docs/pre-launch-qa-report.md`](pre-launch-qa-report.md).

---

## 12. Launch sign-off

| Step | Done |
| --- | --- |
| Production env vars set on Vercel | [ ] |
| Custom domain + SSL active | [ ] |
| `npm run build` green on deploy branch | [ ] |
| `/sitemap.xml` uses `https://japanprotips.com` | [ ] |
| `/robots.txt` references correct sitemap | [ ] |
| GA4 receiving traffic (if ID set) | [ ] |
| Clarity tag active (if ID set) | [ ] |
| Search Console sitemap submitted | [ ] |
| Top URLs manual pass (section 10) | [ ] |
| `/dev/*` returns 404 on production | [ ] |
