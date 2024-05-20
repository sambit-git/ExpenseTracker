import { Router } from "express";

import {
  createAccount,
  allAccounts,
  deleteAccount,
  updateAccount,
} from "../controllers/account.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/create", isAuthenticated, createAccount);
router.get("/all", isAuthenticated, allAccounts);
router.put("/edit/:accountId", isAuthenticated, updateAccount);
router.delete("/delete/:accountId", isAuthenticated, deleteAccount);

export default router;
