import { Router } from "express";

// app routes
import mediaRoutes from "./media";
import userRoutes from "./user";
import linkRoutes from "./link";
import messageRoutes from "./message";
import formRoutes from "./form";

// initialize express router
const router = Router();

// mount routes
router.use("/auth", userRoutes);
router.use("/media", mediaRoutes);
router.use("/links", linkRoutes);
router.use("/messages", messageRoutes);
router.use("/forms", formRoutes);

// export router
export default router;
