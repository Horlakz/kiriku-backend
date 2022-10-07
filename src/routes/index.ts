import { Router } from "express";

// app routes
import mediaRoutes from "./media";
import userRoutes from "./user";
import linkRoutes from "./link";

// initialize express router
const router = Router();

// mount routes
router.use("/auth", userRoutes);
router.use("/media", mediaRoutes);
router.use("/links", linkRoutes);

// export router
export default router;
