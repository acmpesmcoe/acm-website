# ACM PES MCOE — Public Website

> **Part of the [acm-website](../../README.md) monorepo** — see root README for
> setup, installation, and running instructions.

## Tech stack
- React 19 + TypeScript (Vite)
- Tailwind CSS
- Framer Motion (page/scroll animations, 3D team cards)
- Canvas-based animated network hero (no extra libs)
- react-router-dom
- lucide-react icons

## Pages
- **Home** — hero, intro, why join, upcoming events preview, animated stats, featured photos, join CTA
- **About** — ACM overview, chapter overview, mission & vision, faculty coordinator
- **Events** — upcoming/past tabs, event gallery, registration section
- **Team** — faculty mentors + core members as 3D tilt cards with GitHub/LinkedIn links
- **Contact** — contact form, email, socials, college location

## Production build
```bash
npm run build:web    # from the repo root
```
Output goes to `dist/`.

## Deploy
- **Vercel**: import the repo, set root directory to `apps/web`, framework preset "Vite".
- See the [root README](../../README.md) for full deployment instructions.

## Design notes
- Palette: near-black void background with a violet→cyan signal gradient
  and a warm amber accent used sparingly for emphasis.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels/eyebrows).
- Signature element: an animated node network in the hero — a literal nod
  to ACM, the *Association* for Computing Machinery, and to the chapter as
  a network of people.
