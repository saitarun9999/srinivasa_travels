# Srinivasa Travels — agent notes

- **Stack**: Next.js **15** (App Router, pinned per PRD — the scaffold's Next 16
  was downgraded), React 19, TypeScript, Tailwind CSS **v4** (tokens live in
  `src/app/globals.css` under `@theme`; there is no `tailwind.config`).
- **Content seam**: all data access goes through `src/lib/data.ts`
  (Google Sheets via `CONTENT_API_URL`, typed fallbacks in `src/lib/fallback/`).
  Never fetch content directly from pages/components — Phase 2 swaps this seam
  for FastAPI with zero UI changes.
- **No backend**: no API routes, no database, no auth. Enquiries convert via
  WhatsApp deep links (`whatsappLink` in `src/lib/site.ts`).
- **Design system**: royal blue `#0B4EA2` / gold `#F4B400`; Poppins display +
  Inter body via `next/font`; radii card 20 / button 12 / image 24. The gold
  `.pinstripe` and dashed `.route-line` are the brand signature — reuse them
  rather than inventing new devices.
- **Dynamic route params are Promises** (Next 15): `params: Promise<{slug}>`,
  `await params` — keep this pattern in new dynamic pages.
- Placeholder phone/WhatsApp numbers live in `src/lib/site.ts` — real numbers
  arrive via `NEXT_PUBLIC_*` env vars at deploy time.
- Verify with `npm run build` (all routes must stay statically prerenderable)
  and `npx eslint src`.
