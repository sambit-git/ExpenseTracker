import { Router } from "express";

import {
  createCategory,
  allCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/create", isAuthenticated, createCategory);
router.get("/all", isAuthenticated, allCategory);
router.put("/edit/:categoryId", isAuthenticated, updateCategory);
router.delete("/delete/:categoryId", isAuthenticated, deleteCategory);

export default router;
