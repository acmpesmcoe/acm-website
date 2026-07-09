import { Router } from "express";
import { submitMessage, getMessages, markRead, deleteMessage } from "../controllers/contactController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

// Public
router.post("/", submitMessage);

// Admin only
router.get("/", requireAuth, getMessages);
router.patch("/:id/read", requireAuth, markRead);
router.delete("/:id", requireAuth, deleteMessage);

export default router;
