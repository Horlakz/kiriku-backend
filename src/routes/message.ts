import { Router } from "express";

import {
  createMessage,
  getMessages,
  updateMessage,
} from "../controllers/message";
import { isPublic } from "../middlewares/message";
import { protect } from "../middlewares/auth";
import upload from "../config/multer";

const router = Router();

router.post("/", upload.single("image"), createMessage);
router.get("/:link", isPublic, getMessages);
router.patch("/:id", protect, updateMessage);

export default router;
