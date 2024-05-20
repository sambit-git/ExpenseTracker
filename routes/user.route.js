import { Router } from "express";

import {
  register,
  showAllUsers,
  login,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/all", showAllUsers);

export default router;
