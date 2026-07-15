import { Router } from "express";
import { getPublicEvents, getAll, getOne, create, update, remove } from "../controllers/eventController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", getPublicEvents);
router.get("/:id", getOne);

// Admin only
router.get("/admin/all", requireAuth, getAll);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
