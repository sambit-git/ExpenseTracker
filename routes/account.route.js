import { Router } from "express";

import {
  createAccount,
  allAccounts,
  deleteAccount,
  updateAccount,
} from "../controllers/account.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";
import { hasUserAccessToAccount } from "../middlewares/account.middleware.js";

const router = Router();

router.post("/create", isAuthenticated, createAccount);
router.get("/all", isAuthenticated, allAccounts);
router.put(
  "/edit/:accountId",
  isAuthenticated,
  hasUserAccessToAccount,
  updateAccount
);
router.delete(
  "/delete/:accountId",
  isAuthenticated,
  hasUserAccessToAccount,
  deleteAccount
);

export default router;
