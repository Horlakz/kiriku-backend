import { Router } from "express";

import {
  createMessage,
  getMessages,
  updateMessage,
} from "../controllers/message";
import { isPublic } from "../middlewares/message";
import upload from '../config/multer'

const router = Router();

router.post("/", upload.single('image'), createMessage);
router.get("/:link", isPublic, getMessages);
router.patch("/:id", updateMessage);

export default router;
