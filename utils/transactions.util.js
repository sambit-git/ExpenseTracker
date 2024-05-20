import { hasUserAccessToCategory } from "./category.util.js";
import { hasUserAccessToAccount } from "./account.util.js";
import { errResponse } from "./exception_response.util.js";
import Transaction from "../models/transaction.model.js";

export const hasUserAccessToAccountAndCategory = async (
  userId,
  accountId,
  categoryId
) => {
  if (accountId) {
    const { accountObjId, error } = await hasUserAccessToAccount(
      userId,
      accountId
    );
    if (error)
      return { error: errResponse(403, "Unauthorized access to account") };
  }
  if (categoryId) {
    const { categoryObjId, error } = await hasUserAccessToCategory(
      userId,
      categoryId
    );

    if (error)
      return { error: errResponse(403, "Unauthorized access to category") };
  }
  return { hasAccess: true };
};

export const hasUserAccessToTransaction = async (userId, transactionId) => {
  if (!transactionId)
    return { error: errResponse(400, "TransactionId is not provided!") };

  try {
    const transaction = await Transaction.findById(transactionId);
    if (!transaction)
      return { error: errResponse(404, "Transaction not found!") };

    if (!transaction.user.equals(userId))
      return { error: errResponse(403, "Unauthorized access") };

    return { transaction };
  } catch (err) {
    return { error: errResponse(500, `Internal server error: ${err}`) };
  }
};
