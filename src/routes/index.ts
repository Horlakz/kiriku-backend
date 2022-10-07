import { Router } from "express";

// app routes
import mediaRoutes from "./media";
import userRoutes from "./user";
import linkRoutes from "./link";
import messageRoutes from "./message";

// initialize express router
const router = Router();

// mount routes
router.use("/auth", userRoutes);
router.use("/media", mediaRoutes);
router.use("/links", linkRoutes);
router.use("/messages", messageRoutes);

// export router
export default router;
