// import router
import { Router } from "express";

// get controllers
import {
  register,
  login,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/user";

// middlewares
import { protect } from "../middlewares/auth";

// initialize express router
const router = Router();

// create route
// router.post("/register", register);
router.post("/login", login);
router.get("/user", protect, getUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

// export route(s)
export default router;
