# ACM PES MCOE — Backend (Phase 2)

A Node.js + Express + MongoDB API that powers the admin side of the ACM
website: login, event management, team management, alumni management, and
contact form storage — matching the SRS's Phase 2 spec.

## Tech stack
- Node.js + Express
- MongoDB (via Mongoose) — hosted for free on MongoDB Atlas
- JWT for admin authentication, bcrypt for password hashing
- helmet + rate limiting for basic security

---

## Part 1 — Set up MongoDB Atlas (one-time, ~5 minutes)

MongoDB Atlas is a free, cloud-hosted MongoDB database — you don't need to
install or run a database on your own laptop.

1. Go to **mongodb.com/cloud/atlas/register** and sign up (Google sign-in works).
2. When asked to create a cluster, choose the **free "M0" tier**. Pick any
   cloud provider/region close to you (e.g. Mumbai if available).
3. **Create a database user**: set a username and a password — save these
   somewhere safe, you'll need them in a moment. (Different from your Atlas
   login.)
4. **Network access**: click "Add IP Address" → choose **"Allow access from
   anywhere"** (0.0.0.0/0). This is fine for a student project — it just
   means the database is reachable from the internet, but it's still
   protected by the username/password.
5. Once the cluster finishes deploying (~2 minutes), click **Connect** →
   **Drivers** → copy the connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the database user you created
   in step 3, and add a database name before the `?`, e.g.:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/acm-website?retryWrites=true&w=majority
   ```

Keep this string handy for the next part.

---

## Part 2 — Run the backend locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create your real `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

3. Open `.env` and fill in:
   - `MONGODB_URI` — the connection string from Part 1
   - `JWT_SECRET` — any long random string. Generate one with:
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — the login you'll use to
     access the admin dashboard (once built) or call protected API routes

4. Create your first admin login:
   ```bash
   npm run seed:admin
   ```
   You should see `Created admin: your-email@example.com`.

5. Start the server:
   ```bash
   npm run dev
   ```
   You should see `MongoDB connected` and `ACM backend running on
   http://localhost:5000`.

6. Test it's alive:
   ```bash
   curl http://localhost:5000/api/health
   ```

---

## API overview

All routes are prefixed with `/api`.

### Auth
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Log in, returns a JWT token |
| GET | `/auth/me` | Admin | Get current logged-in admin's info |

### Events
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/events` | Public | Returns `{ upcoming: [...], past: [...] }` |
| GET | `/events/:id` | Public | Get one event |
| GET | `/events/admin/all` | Admin | All events, unfiltered |
| POST | `/events` | Admin | Create an event |
| PUT | `/events/:id` | Admin | Update an event |
| DELETE | `/events/:id` | Admin | Delete an event |

### Team
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/team` | Public | Returns `{ faculty: [...], core: [...] }` |
| POST | `/team` | Admin | Add a team member |
| PUT | `/team/:id` | Admin | Update a team member |
| DELETE | `/team/:id` | Admin | Remove a team member |

### Alumni
| Method | Route | Access | Description |
|---|---|---|---|
| GET | `/alumni` | Public | List all alumni |
| POST | `/alumni` | Admin | Add an alumnus |
| PUT | `/alumni/:id` | Admin | Update an alumnus |
| DELETE | `/alumni/:id` | Admin | Remove an alumnus |

### Contact
| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/contact` | Public | Submit the contact form (rate-limited: 5 per 15 min per IP) |
| GET | `/contact` | Admin | View all submitted messages |
| PATCH | `/contact/:id/read` | Admin | Mark a message as read |
| DELETE | `/contact/:id` | Admin | Delete a message |

### Calling admin-only routes
Include the token from `/auth/login` in the `Authorization` header:
```
Authorization: Bearer <token>
```

Example login + create event with `curl`:
```bash
# Log in
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"your-password"}'

# Copy the "token" from the response, then:
curl -X POST http://localhost:5000/api/events \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer PASTE_TOKEN_HERE" \
  -d '{"title":"HackMCOE 2026","date":"2026-08-22","tag":"Hackathon","description":"24-hour build sprint."}'
```

---

## Part 3 — Deploy the backend (when ready)

**Render** (matches the SRS) is a good free option:

1. Push this `acm-backend` folder to its own GitHub repo (separate from the
   frontend repo, or as a subfolder — either works).
2. Go to **render.com** → sign up with GitHub → **New → Web Service**.
3. Connect the repo. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add all the same variables from your `.env` file under **Environment**.
5. Deploy. Render gives you a URL like `https://acm-backend.onrender.com`.
6. Update `CORS_ORIGINS` in Render's environment variables to include your
   real deployed frontend URL (e.g. `https://acm-blond.vercel.app`), so the
   browser is allowed to call the API from there.
7. On the frontend, you'll then point API calls at this Render URL instead
   of `localhost:5000`.

Note: Render's free tier "sleeps" after inactivity, so the first request
after a while can take ~30-60 seconds to wake up. Fine for a student
project; worth knowing about.

---

## What's intentionally not built yet

- The actual **admin dashboard UI** (a frontend page where you log in and
  see forms to add/edit events, team, alumni) — this backend exposes the
  API; the dashboard is the next piece to build on top of it.
- File uploads for images (SRS mentions Cloudinary for this) — for now,
  `image` fields expect a URL string, same as the frontend currently uses.
- Role-based permissions beyond `admin`/`superadmin` (SRS mentions this as
  a nice-to-have; the fields exist on the Admin model already for later).
