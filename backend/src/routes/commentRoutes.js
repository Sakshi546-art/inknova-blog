
import express from "express";

import {
  createComment,
  getComments,
  deleteComment,
} from "../controllers/commentController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET COMMENTS FOR A BLOG
router.get("/:blogId", protect, getComments);

// CREATE COMMENT
router.post("/:blogId", protect, createComment);

// DELETE COMMENT
router.delete("/:id", protect, deleteComment);

export default router;

