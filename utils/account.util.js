import Account from "../models/account.model.js";
import { errResponse } from "./exception_response.util.js";

export const hasUserAccessToAccount = async (userId, accountId) => {
  if (!accountId)
    return { error: errResponse(400, "AccountId is not provided!") };

  try {
    const account = await Account.findById(accountId);
    if (!account) return { error: errResponse(404, "Account not found!") };

    if (!account.user.equals(userId))
      return { error: errResponse(403, "Unauthorized access") };

    return { account };
  } catch (err) {
    return { error: errResponse(500, `Internal server error: ${err}`) };
  }
};
