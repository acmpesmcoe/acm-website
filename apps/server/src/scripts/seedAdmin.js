// Run with: npm run seed:admin
// Creates (or updates) the first admin account from env vars,
// so you have a login to access the admin dashboard.
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";

async function seed() {
  await connectDB();

  const name = process.env.SEED_ADMIN_NAME || "Chapter Admin";
  const email = process.env.SEED_ADMIN_EMAIL;
  const password = process.env.SEED_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in your .env file first.");
    process.exit(1);
  }

  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) {
    existing.password = password;
    existing.name = name;
    await existing.save();
    console.log(`Updated existing admin: ${email}`);
  } else {
    await Admin.create({ name, email, password, role: "superadmin" });
    console.log(`Created admin: ${email}`);
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed();
