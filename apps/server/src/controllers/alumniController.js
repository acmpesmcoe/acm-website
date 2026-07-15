import Alumni from "../models/Alumni.js";
import { createCrudController } from "./crudFactory.js";

export const { getAll, getOne, create, update, remove } = createCrudController(Alumni, {
  sortBy: "-batch",
});
