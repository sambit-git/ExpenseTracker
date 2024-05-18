import { Router } from "express";

import {
  createCategory,
  allCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";
import { hasUserAccessToCategory } from "../middlewares/category.middleware.js";

const router = Router();

router.post("/create", isAuthenticated, createCategory);
router.get("/all", isAuthenticated, allCategory);
router.put(
  "/edit/:categoryId",
  isAuthenticated,
  hasUserAccessToCategory,
  updateCategory
);
router.delete(
  "/delete/:categoryId",
  isAuthenticated,
  hasUserAccessToCategory,
  deleteCategory
);

export default router;
