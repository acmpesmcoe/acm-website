import { Router } from "express";
import { getAll, getOne, create, update, remove } from "../controllers/alumniController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public (alumni list is fine to expose fully, no separate categorization needed)
router.get("/", getAll);
router.get("/:id", getOne);

// Admin only
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
