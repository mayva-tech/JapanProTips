# Itinerary planner deployment notes

Production setup for the Japan Itinerary Planner (`/tools/japan-itinerary-planner`), curated templates (`/itinerary-templates`), and saved share links (`/itineraries/[slug]`).

**Planner trip lengths:** `1`, `3`, `5`, `7`, `10`, and `14` days. Curated template CTAs prefill the matching duration when the template outline uses that length.

---

## Vercel environment variables

Set in **Project → Settings → Environment Variables** for Production (and Preview if you test sharing there).

| Variable | Required for | Notes |
| --- | --- | --- |
| `OPENAI_API_KEY` | AI generation | Without it, users get demo itineraries only |
| `OPENAI_MODEL` | AI generation | Optional; defaults to `gpt-4.1-mini` in code |
| `GOOGLE_MAPS_API_KEY` | Places + Routes | Server-side only; never prefix with `NEXT_PUBLIC_` |
| `UPSTASH_REDIS_REST_URL` | Save/share, cache, rate limits | Pair with token below |
| `UPSTASH_REDIS_REST_TOKEN` | Save/share, cache, rate limits | Create database at [upstash.com](https://upstash.com) |

Site-wide (recommended): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `NEXT_PUBLIC_CLARITY_PROJECT_ID`.

### After deploying: production health check

Open in a browser or curl:

```text
https://japanprotips.com/api/itineraries/health
```

(or your production host)

Confirm the JSON booleans match what you expect for production capability. The route does **not** call OpenAI, Google, or Redis. It only reports whether env vars are present.

| Field | Expected when fully configured |
| --- | --- |
| `openaiConfigured` | `true` if `OPENAI_API_KEY` is set |
| `googleMapsConfigured` | `true` if `GOOGLE_MAPS_API_KEY` is set |
| `upstashConfigured` | `true` if Upstash URL + token are set |
| `canGenerateAi` | Same as `openaiConfigured` |
| `canVerifyPlaces` | Same as `googleMapsConfigured` |
| `canEstimateRoutes` | Same as `googleMapsConfigured` |
| `canSaveShareLinks` | Same as `upstashConfigured` |

Example (full stack):

```json
{
  "openaiConfigured": true,
  "googleMapsConfigured": true,
  "upstashConfigured": true,
  "canGenerateAi": true,
  "canVerifyPlaces": true,
  "canEstimateRoutes": true,
  "canSaveShareLinks": true
}
```

If a flag is `false`, users still get a usable experience where possible (demo itineraries without OpenAI; no save without Upstash). Fix env on Vercel and redeploy before announcing save/share or AI generation.

---

## OpenAI setup

1. Create an API key in the OpenAI dashboard.
2. Set `OPENAI_API_KEY` in Vercel.
3. Optionally set `OPENAI_MODEL` (e.g. `gpt-4.1-mini`).
4. Set usage limits and billing alerts in the OpenAI account.
5. Monitor token usage after launch; generation runs once per uncached form submit.

If the key is missing or a request fails, the app returns a **demo itinerary** and may show a warning in the UI.

---

## Google Cloud setup

Enable billing on the project, then enable:

- **Places API (New)** — stop name/location verification
- **Routes API** — estimated travel times between stops

Create an API key restricted to:

- **Application restrictions:** IP addresses (Vercel egress) or HTTP referrers if applicable to your hosting model. For server-only Next.js routes, IP restriction on Vercel’s outbound IPs is typical.
- **API restrictions:** Only Places API (New) and Routes API.

Set `GOOGLE_MAPS_API_KEY` in Vercel. Do not expose this key in client bundles.

**Quotas and budget:** Set daily quotas and budget alerts in Google Cloud Console. The app caps **20 Places lookups** and **20 Routes calls** per generated itinerary to limit runaway cost.

Field masks in `lib/places/google-places.ts` and `lib/routes/google-routes.ts` request minimal fields (no wildcard masks).

---

## Upstash Redis setup

1. Create a Redis database (REST API enabled).
2. Copy `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` into Vercel.
3. Used for:
   - Saved itinerary share links (`itinerary:{slug}`, **30-day TTL**)
   - Optional generation result cache
   - Generate/save rate limiting (5 generates / 10 min, 20 saves / 10 min per IP)

Without Upstash, save/share returns 503 and rate limits are skipped (generate still works).

---

## SEO and indexing reminders

- **Indexable:** `/tools/japan-itinerary-planner`, `/itinerary-templates`, `/itinerary-templates/[slug]`
- **Not indexed:** `/itineraries/[slug]` (user-generated share links, `noindex`)
- Saved itineraries are **not** in `app/sitemap.ts`

Curated templates are marketing/education pages; generated user itineraries are ephemeral share links.

---

## Share link expiry

Saved links stored in Redis expire after **30 days** (`TTL_SECONDS` in `lib/itinerary/itinerary-storage.ts`). The planner UI and shared itinerary page mention this. Users can save again from the planner to get a new link.

---

## Related docs

- [Itinerary planner launch checklist](./itinerary-planner-launch-checklist.md) (final MVP sign-off)
- [Itinerary planner QA checklist](./itinerary-planner-qa-checklist.md)
- [Analytics tracking checklist](./analytics-tracking-checklist.md)
- [Production deployment checklist](./production-deployment-checklist.md)
- [`.env.example`](../.env.example)
