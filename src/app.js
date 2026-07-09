import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import alumniRoutes from "./routes/alumniRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Security & parsing
app.use(helmet());
app.use(express.json({ limit: "1mb" }));

// CORS: only allow your actual frontend domain(s) to call this API
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((s) => s.trim());
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Incoming request from origin:", origin);
      console.log("Allowed origins are:", allowedOrigins);
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(morgan("dev"));

// Rate limit the contact form specifically, to block spam bots
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: { error: "Too many messages sent. Please try again later." },
});
app.use("/api/contact", contactLimiter);

// General API rate limit as a safety net
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
});
app.use("/api", generalLimiter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/alumni", alumniRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
