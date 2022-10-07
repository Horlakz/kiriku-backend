import { Router } from "express";

// app routes
import mediaRoutes from "./media";
import userRoutes from "./user";

// initialize express router
const router = Router();

// mount routes
router.use("/auth", userRoutes);
router.use("/media", mediaRoutes);

// export router
export default router;
