# ACM PES MCOE — Admin Dashboard (Phase 2)

A separate React app for managing the content behind the public ACM website:
events, team members, alumni, and contact form submissions. Talks to the
`acm-backend` API you already set up.

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

## Run locally

Make sure your backend (`acm-backend`) is already running first — this
dashboard is useless without it.

```bash
npm install
cp .env.example .env
```

Open `.env` and confirm `VITE_API_URL` points at your backend:
```
VITE_API_URL=http://localhost:5000/api
```

Then:
```bash
npm run dev
```

Visit the URL it prints (usually `http://localhost:5173` — if that's taken
by your other project, Vite will pick the next free port automatically, or
run it with `-- --port 5174` to force one).

Log in with the same email/password you set as `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD` when you ran `npm run seed:admin` in the backend.

## Deploy

Same pattern as your public site:
1. Push this to its own GitHub repo
2. Import into Vercel
3. In Vercel's project settings, add an environment variable:
   ```
   VITE_API_URL=https://your-deployed-backend-url.onrender.com/api
   ```
4. Also update `CORS_ORIGINS` in your **backend's** environment variables
   to include this dashboard's deployed URL, so the browser is allowed to
   call the API from there.

Consider **not** linking to this dashboard from your public site's nav —
keep the URL semi-private (bookmark it yourself) since it's the door to
editing all your content. A login screen protects it either way, but no
need to advertise it.

## What's intentionally not built yet

- No password reset flow (change it directly via `npm run seed:admin` on
  the backend if you forget it)
- No image upload — image fields still take a URL (Cloudinary integration,
  per the SRS, would replace this later)
- No multi-admin management UI (adding a second admin currently means
  running the backend's seed script again with different values, or
  inserting directly into the database)
