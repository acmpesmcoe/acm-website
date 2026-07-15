import Event from "../models/Event.js";
import { createCrudController } from "./crudFactory.js";

const base = createCrudController(Event, { sortBy: "date" });

// Public: split into upcoming/past automatically based on today's date,
// so the frontend never has to send a "status" filter itself.
export async function getPublicEvents(req, res, next) {
  try {
    const now = new Date();
    const [upcoming, past] = await Promise.all([
      Event.find({ date: { $gte: now } }).sort("date"),
      Event.find({ date: { $lt: now } }).sort("-date"),
    ]);
    res.json({ upcoming, past });
  } catch (err) {
    next(err);
  }
}

export const { getAll, getOne, create, update, remove } = base;
