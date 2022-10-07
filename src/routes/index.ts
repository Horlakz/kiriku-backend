import { Router } from "express";

// app routes
import userRoutes from "./user";

// initialize express router
const router = Router();

// mount routes
router.use("/auth", userRoutes);

// export router
export default router;
