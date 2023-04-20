import { Router } from "express";

import { createForm, getForms } from "../controllers/form";
import { protect } from "../middlewares/auth";

const router = Router();

router.route("/").post(createForm).get(protect, getForms);

export default router;
