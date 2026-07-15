# ACM PES MCOE — Backend API

> **Part of the [acm-website](../../README.md) monorepo** — see root README for
> setup, installation, and running instructions.

A Node.js + Express + MongoDB API that powers the admin side of the ACM
website: login, event management, team management, alumni management, and
contact form storage.

## Tech stack
- Node.js + Express
- MongoDB (via Mongoose) — hosted for free on MongoDB Atlas
- JWT for admin authentication, bcrypt for password hashing
- helmet + rate limiting for basic security

---

## MongoDB Atlas Setup (one-time, ~5 minutes)

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

Paste this connection string into `apps/server/.env` as `MONGODB_URI`.

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

---

## Deploy (Render)

1. Connect this repo to Render → **New → Web Service**
2. Set **Root Directory** to `apps/server`
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add all env variables from `.env.example`
6. Update `CORS_ORIGINS` to include your deployed frontend URLs

Note: Render's free tier "sleeps" after inactivity, so the first request
after a while can take ~30-60 seconds to wake up.

---

## What's intentionally not built yet

- File uploads for images (SRS mentions Cloudinary for this) — for now,
  `image` fields expect a URL string, same as the frontend currently uses.
- Role-based permissions beyond `admin`/`superadmin` (SRS mentions this as
  a nice-to-have; the fields exist on the Admin model already for later).
