import { Router } from "express";
import { getPublicTeam, getAll, getOne, create, update, remove } from "../controllers/teamController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", getPublicTeam);
router.get("/:id", getOne);

// Admin only
router.get("/admin/all", requireAuth, getAll);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
