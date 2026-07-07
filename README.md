# Srinivasa Travels — Frontend (Phase 1)

Premium, SEO-first marketing site for Srinivasa Travels, a chauffeur-driven car
rental company in Hyderabad. Built with **Next.js 15 (App Router) + TypeScript +
Tailwind CSS v4**. No backend — content comes from Google Sheets via a Google
Apps Script JSON endpoint, with typed local fallbacks.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all pages prerender statically)
npm run lint
```

## Content: Google Sheets integration

All dynamic content flows through **one seam**: `src/lib/data.ts`.

- Set `CONTENT_API_URL` (see `.env.example`) to a Google Apps Script web-app
  URL. Each collection is fetched as
  `GET {CONTENT_API_URL}?sheet=<name>` where `<name>` is one of
  `vehicles`, `services`, `routes`, `testimonials`, `faqs`, `blog`.
- The endpoint must return a JSON **array** matching the corresponding type in
  `src/types/index.ts` (one sheet tab per collection; the Apps Script maps rows
  to objects).
- Responses are cached with ISR (`revalidate: 3600`). If the endpoint is unset,
  unreachable, or returns an empty array, the site silently serves the typed
  fallback content in `src/lib/fallback/` — the build never breaks because of
  the sheet.
- **Future backend**: point `CONTENT_API_URL` at FastAPI (or swap the fetch in
  `data.ts`). Nothing above that file — pages, sections, components — changes.

## Site configuration

Phone number, WhatsApp number, address, social links and canonical domain live
in `src/lib/site.ts` (overridable via `NEXT_PUBLIC_*` env vars — see
`.env.example`). **Replace the placeholder phone/WhatsApp numbers before
launch.**

## Structure

```
src/
  app/            # routes: /, /fleet[/slug], /services[/slug], /routes[/slug],
                  # /pricing, /about, /contact, /faq, /blog[/slug],
                  # sitemap.ts, robots.ts
  components/     # ui primitives, layout (Navbar/Footer/MobileActionBar), cards
  sections/       # homepage + shared page sections
  lib/            # data.ts (content seam), site.ts (config), seo.ts (metadata + JSON-LD)
  lib/fallback/   # typed seed content (mirrors the Google Sheet schema)
  types/          # shared TypeScript models
public/images/    # fleet artwork — SVG placeholders; swap for real photography
```

## Design system

- **Colors**: royal blue `#0B4EA2`, gold `#F4B400`, surface `#F8FAFC`,
  ink `#1E293B` — defined as Tailwind tokens in `src/app/globals.css`.
- **Type**: Poppins (display) + Inter (body) via `next/font`.
- **Signature**: the gold "livery pinstripe" (`.pinstripe`) on section
  headings, and the dashed gold journey line (`.route-line`) on route pages.
- **Radii**: cards 20px, buttons 12px, images 24px.
- Scroll reveals respect `prefers-reduced-motion`.

## SEO

- Per-page metadata (title, description, canonical, Open Graph, Twitter) via
  `buildMetadata` in `src/lib/seo.ts`.
- JSON-LD: `TaxiService` (site-wide), `FAQPage`, `BreadcrumbList`, `Product`
  (vehicles), `BlogPosting` (articles).
- `sitemap.xml` and `robots.txt` generated from live content.

## Before launch checklist

1. Replace placeholder phone/WhatsApp/email/address in `src/lib/site.ts` or env.
2. Swap `public/images/fleet/*.svg` for real vehicle photography (keep paths or
   update the sheet's `image` column).
3. Set `NEXT_PUBLIC_SITE_URL` to the production domain.
4. Point `CONTENT_API_URL` at the Apps Script endpoint once the sheet is ready.
# srinivasa_travels
