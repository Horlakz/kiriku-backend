import { Router } from "express";

import {
  createMessage,
  getMessages,
  updateMessage,
} from "../controllers/message";
import { isPublic } from "../middlewares/message";

const router = Router();

router.post("/", createMessage);
router.get("/:link", isPublic, getMessages);
router.patch("/:id", updateMessage);

export default router;
