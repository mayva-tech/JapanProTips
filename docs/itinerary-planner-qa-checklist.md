# Itinerary planner QA checklist

Use this list before shipping itinerary planner changes to production. It covers env setup, user flows, APIs, SEO, analytics, and cost/safety limits.

For the final MVP launch pass, also complete [Itinerary planner launch checklist](./itinerary-planner-launch-checklist.md).

**Quick health check:** `GET /api/itineraries/health` returns boolean capability flags only (no secrets, no external API calls).

**MVP feature set:** durations `1`, `3`, `5`, `7`, `10`, `14`; 15 curated templates; OpenAI + mock fallback; Google Places + Routes (capped); Upstash save/share (30-day TTL); PDF export; gear box; guide and hub CTAs.

---

## A. Required environment variables

Set in `.env.local` for local dev and in Vercel **Production** for deploy. See [`.env.example`](../.env.example).

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | AI itinerary generation |
| `OPENAI_MODEL` | Model id (default `gpt-4.1-mini` if unset) |
| `GOOGLE_MAPS_API_KEY` | Places verification + Routes travel-time estimates (server only) |
| `UPSTASH_REDIS_REST_URL` | Saved share links + generation cache + rate limits |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash REST auth |

Optional site analytics (not itinerary-specific): `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

---

## B. Local test matrix

Run `npm run dev` and test `/tools/japan-itinerary-planner` under each configuration.

| Configuration | Expected behavior |
| --- | --- |
| **No env vars** | `GET /api/itineraries/health` shows all flags `false`. Generate returns **demo** itinerary (`source: mock`). Save returns **503** with friendly message. No crash. |
| **OpenAI only** | `canGenerateAi: true`. AI outlines generate. Places/Routes skipped if Google key missing. Save still 503 without Upstash. |
| **OpenAI + Google Maps** | `canVerifyPlaces` and `canEstimateRoutes: true`. Stops may get place ids; transit legs may show Google estimates (capped). |
| **OpenAI + Google Maps + Upstash** | Full stack: cache hits, rate limits active, save/share works, 30-day TTL on saved links. |
| **Mock mode** | `POST /api/itineraries/generate?mock=1` always returns demo itinerary without calling OpenAI. |

After changing env, restart the dev server. Confirm health route reflects new flags without exposing values.

---

## C. User flow tests

| Flow | Steps | Pass criteria |
| --- | --- | --- |
| **Generate** | Fill form → Generate | Preview appears; badge shows AI or Demo; warnings shown when applicable |
| **Edit** | Move stop up/down | Order updates in UI; share URL cleared if previously saved |
| **Remove stop** | Remove a stop | Stop removed; analytics `itinerary_edit_action` fires (GA4 debug) |
| **Save** | Save shareable link (Upstash required) | URL returned; copy works |
| **Copy link** | Copy after save | Clipboard + `itinerary_copy_link` event |
| **Open shared link** | Visit `/itineraries/[slug]` | Read-only result; noindex in page metadata |
| **Export PDF** | Download PDF | File downloads; `itinerary_pdf_download` event |
| **Gear box** | Scroll to gear section | Recommendations visible; `itinerary_gear_box_view` / link clicks |
| **Guide CTA** | `/guides/japan-itinerary` (or any guide with block) | Links to planner/templates; `itinerary_guide_cta_click` |
| **Hub CTA** | `/start-here` or `/tourists` | Planner + templates links; `itinerary_hub_cta_click` |
| **Template CTA** | From `/itinerary-templates/[slug]` → planner CTA | Query prefill + template notice + button "Generate This Itinerary" |
| **3-day generate** | `duration: 3` (mock or AI) | Exactly 3 days in result; day 1 in start city |
| **5-day generate** | `duration: 5` | Exactly 5 days in result |
| **10-day generate** | `duration: 10` | Exactly 10 days in result |
| **Template 3/5/10 CTA** | `/itinerary-templates/3-day-tokyo-itinerary` (and 5-day, 10-day slugs) | Planner prefill uses exact duration `3`, `5`, or `10` |
| **Invalid templateSlug** | `?templateSlug=not-a-real-slug` | No notice; no crash; generate still works |
| **Itinerary not found** | `/itineraries/invalid-or-expired` | Friendly not-found page with link to planner |

---

## D. API checks

Use curl, Postman, or browser devtools. Example bodies use valid enum values from the planner form.

**Supported `duration` values:** `1`, `3`, `5`, `7`, `10`, `14` only.

| Endpoint | Method | Notes |
| --- | --- | --- |
| `/api/itineraries/generate` | POST | Valid JSON body → 200 + `itinerary`, `source`, optional `warning`, `cached` |
| `/api/itineraries/generate` | POST | `duration: 3`, `5`, or `10` accepted; response `days.length` must match duration |
| `/api/itineraries/generate?mock=1` | POST | Forces demo itinerary for any supported duration |
| `/api/itineraries/save` | POST | Full `GeneratedItinerary` body → 200 + `slug`, `url`; 503 if Redis unset |
| `/api/itineraries/health` | GET | JSON booleans only; never API keys or env strings |

**Generate rate limit (Upstash required):** 5 requests per 10 minutes per IP (sliding window).

**Save rate limit (Upstash required):** 20 saves per 10 minutes per IP.

---

## E. SEO checks

| URL pattern | Indexable? | In sitemap? |
| --- | --- | --- |
| `/itinerary-templates` | Yes | Yes |
| `/itinerary-templates/[slug]` | Yes (15 curated slugs) | Yes |
| `/itineraries/[slug]` (saved user links) | **No** (`robots: noindex`) | **No** |
| `/tools/japan-itinerary-planner` | Yes | Yes |

Confirm `app/sitemap.ts` includes template hub + slugs only, not `/itineraries/*`.

---

## F. Analytics checks (GA4)

With `NEXT_PUBLIC_GA_MEASUREMENT_ID` set, use GA4 DebugView or tag assistant. Events use `gtag('event', 'click', { label: ... })`.

| Event label | When |
| --- | --- |
| `itinerary_generate_start` | Generate clicked |
| `itinerary_generate_success` | Generate OK |
| `itinerary_generate_error` | Generate failed |
| `itinerary_save_start` / `success` / `error` | Save share link |
| `itinerary_copy_link` | Copy share URL |
| `itinerary_pdf_download` / `itinerary_pdf_error` | PDF export |
| `itinerary_edit_action` | Move/remove stop |
| `itinerary_template_view` | Curated template page view |
| `itinerary_template_planner_cta_click` | Template → planner CTA |
| `itinerary_planner_template_card_click` | Featured template card on planner page |
| `itinerary_guide_cta_click` | Guide page `ItineraryGuideCta` (planner or template link) |
| `itinerary_hub_cta_click` | Hub page `ItineraryHubCta` (`/`, `/start-here`, `/tourists`) |
| `itinerary_gear_box_view` / `itinerary_gear_link_click` | Gear recommendations |

Template-assisted generate should include `itinerary_template_slug` when arriving from a valid curated template (not full template content).

Full launch event list: [launch checklist section F](./itinerary-planner-launch-checklist.md#f-analytics-events-to-verify).

---

## G. Safety and cost checks

| Check | Implementation |
| --- | --- |
| Generate rate limit | `lib/rate-limit/itinerary-rate-limit.ts` (requires Upstash) |
| Save rate limit | Same file, separate limiter |
| Max Places verifications | 20 per itinerary (`verify-itinerary-places.ts`) |
| Max Routes API calls | 20 legs per itinerary (`estimate-itinerary-routes.ts`) |
| No client-side API keys | `GOOGLE_MAPS_API_KEY` server-only; no `NEXT_PUBLIC_GOOGLE_MAPS_*` |
| No wildcard Google field masks | Explicit masks in `google-places.ts` and `google-routes.ts` |
| User itineraries not in sitemap | Only `/itinerary-templates/*` listed |
| Health route exposes no secrets | `getItineraryEnvHealth()` booleans only |
| Share link TTL | 30 days (`itinerary-storage.ts`) |

---

## Pre-ship commands

```bash
npx tsc --noEmit
npm run build
```

Manual: hit `GET /api/itineraries/health` with env vars unset and set; confirm JSON shape and no secret leakage.
