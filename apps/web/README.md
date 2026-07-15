# ACM PES MCOE — Website (Phase 1)

Phase 1 build of the ACM student chapter website, per the SRS: a fully
functional public site with a premium, animated UI inspired by Apple,
Vercel, and Linear.

## Tech stack
- React 19 + TypeScript (Vite)
- Tailwind CSS
- Framer Motion (page/scroll animations, 3D team cards)
- Canvas-based animated network hero (no extra libs)
- react-router-dom
- lucide-react icons

## Pages included
- **Home** — hero, intro, why join, upcoming events preview, animated stats, featured photos, join CTA
- **About** — ACM overview, chapter overview, mission & vision, faculty coordinator
- **Events** — upcoming/past tabs, event gallery, registration section
- **Team** — faculty mentors + core members as 3D tilt cards with GitHub/LinkedIn links
- **Contact** — contact form, email, socials, college location

## Run locally
```bash
npm install
npm run dev
```
Visit http://localhost:5173

## Production build
```bash
npm run build
npm run preview
```
Output goes to `dist/`.

## Deploy
- **Vercel**: import the repo, framework preset "Vite", no config needed.
- **GitHub Pages**: run `npm run build`, then deploy the `dist/` folder
  (e.g. with the `gh-pages` package or a GitHub Actions workflow).


## Design notes
- Palette: near-black void background with a violet→cyan signal gradient
  and a warm amber accent used sparingly for emphasis.
- Type: Space Grotesk (display), Inter (body), JetBrains Mono (labels/eyebrows).
- Signature element: an animated node network in the hero — a literal nod
  to ACM, the *Association* for Computing Machinery, and to the chapter as
  a network of people.
