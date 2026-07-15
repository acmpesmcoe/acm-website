# ACM PES MCOE — Admin Dashboard

> **Part of the [acm-website](../../README.md) monorepo** — see root README for
> setup, installation, and running instructions.

A separate React app for managing the content behind the public ACM website:
events, team members, alumni, and contact form submissions. Talks to the
backend API (`apps/server`).

## Tech stack
- React + TypeScript (Vite)
- Tailwind CSS (same palette as the public site, for visual consistency)
- react-router-dom
- axios (with the login token attached to every request automatically)

## Pages
- **Login** — authenticates against your backend, stores the session
- **Overview** — quick counts of events / team / alumni / messages
- **Events** — create, edit, delete
- **Team** — create, edit, delete (faculty vs core category)
- **Alumni** — create, edit, delete
- **Messages** — view contact form submissions, mark read, delete

## Production build
```bash
npm run build:admin    # from the repo root
```

## Deploy
- **Vercel**: import the repo, set root directory to `apps/admin`, framework preset "Vite".
- Add `VITE_API_URL` env variable pointing to your deployed backend.
- Update `CORS_ORIGINS` in the backend's env to include this dashboard's URL.
- See the [root README](../../README.md) for full deployment instructions.

## What's intentionally not built yet

- No password reset flow (change it directly via `npm run seed:admin` on
  the backend if you forget it)
- No image upload — image fields still take a URL (Cloudinary integration,
  per the SRS, would replace this later)
- No multi-admin management UI (adding a second admin currently means
  running the backend's seed script again with different values, or
  inserting directly into the database)
