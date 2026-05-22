# Itinerary planner MVP launch checklist

Final pre-launch checklist for the Japan Itinerary Planner MVP. Use this once feature work is complete and before turning on production traffic.

**Related docs:**

- [Itinerary planner QA checklist](./itinerary-planner-qa-checklist.md) (detailed test matrix)
- [Itinerary planner deployment notes](./itinerary-planner-deployment-notes.md) (Vercel, OpenAI, Google, Upstash)
- [Analytics tracking checklist](./analytics-tracking-checklist.md) (GA4, Clarity, event labels)

**MVP scope (shipped):**

- Planner: `/tools/japan-itinerary-planner`
- Curated templates: `/itinerary-templates` (15 slugs) and `/itinerary-templates/[slug]`
- Trip lengths: `1`, `3`, `5`, `7`, `10`, `14` days
- OpenAI generation with demo (mock) fallback
- Google Places verification and Google Routes travel-time estimates (server-side, capped)
- Upstash save/share links (30-day TTL)
- PDF export, gear recommendations, guide CTAs, hub CTAs
- Health endpoint: `GET /api/itineraries/health`

---

## A. Required production env vars

Set in Vercel **Production** (and Preview if you test sharing). See [`.env.example`](../.env.example).

| Variable | Required for | Notes |
| --- | --- | --- |
| `OPENAI_API_KEY` | AI itinerary generation | Without it, users get demo itineraries only |
| `OPENAI_MODEL` | AI generation | Optional; defaults to `gpt-4.1-mini` in code |
| `GOOGLE_MAPS_API_KEY` | Places + Routes | Server-side only; never `NEXT_PUBLIC_*` |
| `UPSTASH_REDIS_REST_URL` | Save/share, cache, rate limits | Pair with token |
| `UPSTASH_REDIS_REST_TOKEN` | Save/share, cache, rate limits | Upstash REST database |
| `NEXT_PUBLIC_SITE_URL` | Canonicals, sitemap, share URLs | e.g. `https://japanprotips.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 | Optional but recommended for funnel QA |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Microsoft Clarity | Optional; same pattern as site-wide analytics |

After deploy, restart is automatic on Vercel when env changes. Re-hit the health route to confirm flags.

---

## B. API health checks

Run against production (replace host if needed).

| Check | Method | Pass criteria |
| --- | --- | --- |
| **Health** | `GET /api/itineraries/health` | JSON with seven booleans only; no secrets; no external API calls |
| **Generate (mock)** | `POST /api/itineraries/generate?mock=1` | `200`, `source: mock`, `days.length` matches `duration` |
| **Generate (AI)** | `POST /api/itineraries/generate` | `200`, `source: openai` when key set; valid itinerary body |
| **Save** | `POST /api/itineraries/save` | `200` + `slug` + `url` when Upstash set; `503` with friendly message when not |

**Health response fields** (all boolean):

- `openaiConfigured`
- `googleMapsConfigured`
- `upstashConfigured`
- `canGenerateAi`
- `canVerifyPlaces`
- `canEstimateRoutes`
- `canSaveShareLinks`

Example:

```bash
curl -s https://japanprotips.com/api/itineraries/health
```

---

## C. Production smoke test flow

Manual pass on production (or staging with production env).

| Step | Action | Pass criteria |
| --- | --- | --- |
| 1 | Open `/tools/japan-itinerary-planner` | Page loads; form shows durations 1, 3, 5, 7, 10, 14 |
| 2 | Generate **1-day** with `?mock=1` or demo mode | One day in preview; no crash |
| 3 | Generate **3-day** (real AI if `OPENAI_API_KEY` set) | Three days; badge shows AI or Demo |
| 4 | Generate **7-day** (real AI) | Seven days; reasonable outline |
| 5 | Open `/itinerary-templates/7-day-japan-first-time` → planner CTA | Prefill + template notice; generate works |
| 6 | Edit itinerary | Move stop / remove stop; order updates |
| 7 | Save shareable link | URL returned when Upstash configured |
| 8 | Open shared link `/itineraries/[slug]` | Read-only view; `noindex` in page source |
| 9 | Download PDF | File downloads |
| 10 | Click Google Maps link on a stop | Opens Maps (when place verified) |
| 11 | Gear box | Recommendations visible; affiliate links work |
| 12 | Analytics | Key events fire in GA4 DebugView (see section F) |

Also spot-check: guide CTA on `/guides/japan-itinerary`, hub CTA on `/start-here`, featured templates on planner page.

---

## D. SEO checks

| URL | Indexable? | In sitemap? |
| --- | --- | --- |
| `/tools/japan-itinerary-planner` | Yes | Yes |
| `/itinerary-templates` | Yes | Yes |
| `/itinerary-templates/[slug]` (15 curated) | Yes | Yes |
| `/itineraries/[slug]` (saved user links) | **No** (`robots: noindex, nofollow`) | **No** |

Confirm:

- `app/sitemap.ts` includes tool page and curated template slugs only.
- Generated saved itineraries are **not** listed in the sitemap.
- `app/itineraries/[slug]/page.tsx` keeps `robots: { index: false, follow: false }` (do not change for MVP).

---

## E. Cost controls

Configure in provider dashboards before launch.

| Control | Where | MVP implementation |
| --- | --- | --- |
| OpenAI usage limit | OpenAI dashboard | Billing alerts + monthly cap |
| Google Cloud budget alert | GCP billing | Alert on Places + Routes spend |
| Places API enabled | GCP APIs | Places API (New) |
| Routes API enabled | GCP APIs | Routes API |
| Google API key restrictions | GCP credentials | IP or app restriction; APIs limited to Places + Routes |
| Upstash plan limits | Upstash console | Free tier OK for low traffic; monitor REST commands |
| Generation rate limit | App | 5 requests / 10 min / IP (requires Upstash) |
| Save rate limit | App | 20 saves / 10 min / IP (requires Upstash) |
| Max Places calls | App | 20 verifications per generated itinerary |
| Max Routes calls | App | 20 legs per generated itinerary |

---

## F. Analytics events to verify

All use `gtag('event', 'click', { label: ... })` via `lib/itinerary/itinerary-analytics.ts`. Requires `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

| Event label | When |
| --- | --- |
| `itinerary_generate_start` | Generate clicked |
| `itinerary_generate_success` | Generate OK |
| `itinerary_generate_error` | Generate failed |
| `itinerary_save_success` | Save share link OK |
| `itinerary_save_error` | Save failed |
| `itinerary_copy_link` | Copy share URL |
| `itinerary_pdf_download` | PDF export OK |
| `itinerary_edit_action` | Move or remove stop |
| `itinerary_template_view` | Curated template page view |
| `itinerary_template_planner_cta_click` | Template page → planner |
| `itinerary_planner_template_card_click` | Featured template card on planner |
| `itinerary_guide_cta_click` | Guide page itinerary CTA |
| `itinerary_hub_cta_click` | Hub page itinerary CTA (`/`, `/start-here`, `/tourists`) |
| `itinerary_gear_box_view` | Gear box visible |
| `itinerary_gear_link_click` | Gear affiliate link click |

Optional related labels (not itinerary-specific): `tool_click:*` from planner crosslinks, `recommendation_click:*` from gear items.

See [Analytics tracking checklist](./analytics-tracking-checklist.md) sections 4b, 4c, and 4d.

---

## G. Known MVP limitations

Document these in support copy and footnotes; do not treat as launch blockers.

- Travel times are **estimates** (Google Routes when available; otherwise heuristic).
- Places verification may **fail gracefully**; stops still show without a place id.
- Routes may be **unavailable** for some legs; UI shows fallback messaging.
- Shared links **expire after 30 days** (Upstash TTL).
- Saved user itineraries are **`noindex`** and not in the sitemap.
- **No account system** (anonymous share links only).
- **No NAVITIME** integration yet.
- **No map embeds** on planner or shared pages.
- **No route optimization** (order is AI/outline + manual edits only).

---

## Pre-launch commands

```bash
npx tsc --noEmit
npm run build
```

## Launch sign-off

| Item | Done |
| --- | --- |
| Production env vars set | [ ] |
| `GET /api/itineraries/health` matches expected capability | [ ] |
| Smoke test flow (section C) | [ ] |
| SEO checks (section D) | [ ] |
| Cost controls configured (section E) | [ ] |
| Analytics sample verified (section F) | [ ] |
| Stakeholder aware of MVP limitations (section G) | [ ] |
