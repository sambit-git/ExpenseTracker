import { Router } from "express";

import {
  register,
  showAllUsers,
  login,
  isLoggedIn,
} from "../controllers/user.controller.js";

import { isAuthenticated } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", showAllUsers);
router.get("/is_logged_in", isAuthenticated, isLoggedIn);

export default router;
