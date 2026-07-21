import { Router } from "express";
import { getPublicGallery, getAll, create, update, remove } from "../controllers/galleryController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public
router.get("/", getPublicGallery);

// Admin only
router.get("/admin/all", requireAuth, getAll);
router.post("/", requireAuth, create);
router.put("/:id", requireAuth, update);
router.delete("/:id", requireAuth, remove);

export default router;
