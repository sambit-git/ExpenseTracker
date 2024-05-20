import { Router } from "express";

import {
  createTransaction,
  allTransactions,
  deleteTransaction,
  updateTransaction,
} from "../controllers/transaction.controller.js";
import { isAuthenticated } from "../middlewares/user.middleware.js";

const router = Router();

router.post("/create", isAuthenticated, createTransaction);
router.get("/all", isAuthenticated, allTransactions);
router.put("/edit/:transactionId", isAuthenticated, updateTransaction);
router.delete("/delete/:transactionId", isAuthenticated, deleteTransaction);

export default router;
