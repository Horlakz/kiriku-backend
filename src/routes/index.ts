import { Router } from "express";

const router = Router();

import UserRoutes from "./user";

router.use("/user", UserRoutes);

export default router;
