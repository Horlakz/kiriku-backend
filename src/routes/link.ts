import { Router } from "express";

import {
  createLink,
  getLink,
  getLinks,
  updateLink,
  deleteLink,
} from "../controllers/link";
import { protect } from "../middlewares/auth";

const router = Router();

router.route("/").post(protect, createLink).get(protect, getLinks);
router
  .route("/:link")
  .get(getLink)
  .put(protect, updateLink)
  .delete(protect, deleteLink);

export default router;
