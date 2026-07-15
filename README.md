# ACM PES MCOE — Website Monorepo

Single repository for the ACM student chapter at PES Modern College of Engineering, Pune. Contains:

| App | Path | Description |
|-----|------|-------------|
| **Public Site** | `apps/web` | React + TypeScript + Vite — the public-facing website |
| **Admin Dashboard** | `apps/admin` | React + TypeScript + Vite — internal content management |
| **Backend API** | `apps/server` | Node.js + Express + MongoDB — REST API powering both frontends |

## Folder Structure

```
acm-website/
├── apps/
│   ├── web/       ← Public site (React + Vite + Tailwind)
│   ├── admin/     ← Admin dashboard (React + Vite + Tailwind)
│   └── server/    ← Backend API (Express + MongoDB)
├── docs/          ← Documentation & migration notes
├── package.json   ← Root workspace manifest
├── .env.example   ← Consolidated env variable reference
└── .gitignore
```

## One-Time Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/acmpesmcoe/acm-website.git
   cd acm-website
   ```

2. **Install all dependencies** (npm workspaces handles all three apps):
   ```bash
   npm install
   ```

3. **Set up environment variables** — each app needs its own `.env` file:
   ```bash
   cp apps/server/.env.example apps/server/.env
   cp apps/web/.env.example    apps/web/.env
   cp apps/admin/.env.example  apps/admin/.env
   ```
   Open each `.env` and fill in the values. See the root `.env.example` for
   a single consolidated reference of all variables across all apps.

4. **Set up MongoDB** — follow the instructions in `apps/server/README.md`
   (Part 1) to create a free MongoDB Atlas cluster and get your connection
   string.

5. **Create your first admin login:**
   ```bash
   npm run seed:admin --workspace=apps/server
   ```

## Running Locally

**Run all three apps in parallel** (recommended for development):
```bash
npm run dev:all
```

This starts:
- Public site at `http://localhost:5173`
- Admin dashboard at `http://localhost:5174` (or next free port)
- Backend API at `http://localhost:5000`

**Or run them individually:**
```bash
npm run dev:web      # Public site only
npm run dev:admin    # Admin dashboard only
npm run dev:server   # Backend API only
```

**Production builds** (frontends only):
```bash
npm run build:web
npm run build:admin
```

## Deployment

Each app is deployed independently, even though they live in one repo:

| App | Platform | Root Directory Setting |
|-----|----------|----------------------|
| Public site | Vercel | `apps/web` |
| Admin dashboard | Vercel | `apps/admin` |
| Backend API | Render | `apps/server` |

### Vercel (web + admin)
1. Import this repo into Vercel
2. In project settings, set **Root Directory** to `apps/web` (or `apps/admin`)
3. Add the `VITE_API_URL` environment variable pointing to your deployed backend

### Render (server)
1. Connect this repo to Render
2. Set **Root Directory** to `apps/server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add all env variables from `apps/server/.env.example`
6. Update `CORS_ORIGINS` to include your deployed frontend URLs

## Per-App Documentation

Each app has its own detailed README with tech stack info, API docs, and
design notes:

- [`apps/web/README.md`](apps/web/README.md) — Public site
- [`apps/admin/README.md`](apps/admin/README.md) — Admin dashboard
- [`apps/server/README.md`](apps/server/README.md) — Backend API (includes full API route reference)
