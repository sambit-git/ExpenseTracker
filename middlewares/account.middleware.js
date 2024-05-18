import Account from "../models/account.model.js";
import { errResponse } from "../utils/exception_response.util.js";

export const hasUserAccessToAccount = async (req, res, next) => {
  const { accountId } = req.params;
  if (!accountId)
    return next(400, "Invalid URI, couldn't find accountId in URI");

  try {
    const account = await Account.findById(accountId);
    if (!account) return next(errResponse(404, "Account not found!"));

    if (!account.user.equals(req.user._id))
      return next(
        errResponse(403, "You're not authorized to delete this account")
      );

    req.account = account;
    return next();
  } catch (error) {
    return next(
      errResponse(500, "Internal server error while fetching account")
    );
  }
};
