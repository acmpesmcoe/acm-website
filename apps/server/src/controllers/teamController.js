import TeamMember from "../models/TeamMember.js";
import { createCrudController } from "./crudFactory.js";

const base = createCrudController(TeamMember, { sortBy: "order" });

export async function getPublicTeam(req, res, next) {
  try {
    const [faculty, core] = await Promise.all([
      TeamMember.find({ category: "faculty" }).sort("order"),
      TeamMember.find({ category: "core" }).sort("order"),
    ]);
    res.json({ faculty, core });
  } catch (err) {
    next(err);
  }
}

export const { getAll, getOne, create, update, remove } = base;
