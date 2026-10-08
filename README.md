# Home Karigar — redesigned site

A standalone Next.js 16 app. The original site is untouched; this project carries
its own copy of the photographs in `public/images`.

```bash
cd redesign
npm install
npm run dev          # http://localhost:3100
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) for canonical URLs, sitemap and Open Graph.

## Content

| What | Where |
| --- | --- |
| Company facts, phones, hours, socials, delivery stats | `src/content/site.ts` |
| Services, process, FAQs, team, video tours | `src/content/studio.ts` |
| Projects & galleries | generated from `../src/data/projects.ts` |

**Adding or changing a project:** edit the legacy `src/data/projects.ts` as before, add the photos under
this project's `public/images/<flat>/`, then run `npm run sync-content` (set `LEGACY_DIR` if the original
repo is not at `~/Desktop/codersnest/home karigar`). The script reads the room comments
(`// ── Kitchen ──`), skips missing files and records image sizes into
`src/content/generated/projects.json`.

## Structure

```
src/
  app/                 routes, metadata, sitemap, robots, manifest, OG image
  components/
    ui/                Button, Icon, Logo, Typography (design primitives)
    layout/            SiteHeader (client), SiteFooter
    sections/          page sections (home/*, ProcessPromise, FaqSection, CtaBand)
    cards/             ProjectCard
    projects/          ProjectsExplorer (filters), RoomGallery, Lightbox
    tours/             TourGallery (carousel/grid + video dialog)
    forms/             Field, ContactForm, LoginForm, validation
    common/            Breadcrumbs, JsonLd, PageHero, EmptyState, MapEmbed
    motion/            RevealObserver (scroll reveals)
  content/             typed content + generated data
  lib/seo/             metadata helper, JSON-LD builders
```

## Design system

All tokens are in `src/app/globals.css` (`@theme`): ivory/linen surfaces, espresso ink, oxblood (from the logo)
as the only action colour, brass for fine detail on dark surfaces. Typography is Fraunces (display) and
Instrument Sans (UI/body) with a fluid scale (`text-display`, `text-h1`–`text-h3`, `text-lead`, `eyebrow`).

## Behaviour preserved from the original site

- The enquiry form validates the same fields (plus an optional home type) and hands off to WhatsApp (+91 86605 22278).
- `/api/youtube/videos` returns the same JSON shape.
- Old project URLs `/project/<id>` permanently redirect to `/projects/<slug>`.
- `/login` stays `noindex`. There is still no auth backend, so the form validates input and explains how
  portal access is granted. Wire `LoginForm` to a provider when one exists.
