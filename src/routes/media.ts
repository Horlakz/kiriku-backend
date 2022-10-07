import { Router } from "express";

import { getFile } from "../controllers/media";

const router = Router();

router.get("/:key", getFile);

export default router;
