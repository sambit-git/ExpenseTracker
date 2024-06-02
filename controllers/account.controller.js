import Account from "../models/account.model.js";
import { hasUserAccessToAccount } from "../utils/account.util.js";
import { errResponse } from "../utils/exception_response.util.js";

export const createAccount = async (req, res, next) => {
  const { name, description, balance } = req.body;
  if (!name)
    return next(
      errResponse(
        400,
        "Account can't be created without a account name. e.g, icici bank"
      )
    );
  try {
    const account = await Account.create({
      name,
      description,
      balance,
      user: req.user._id,
    });
    return res.status(201).json(account);
  } catch (error) {
    return next(error);
  }
};

export const allAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ user: req.user._id }).populate(
      "user"
    );
    return res.status(200).json(accounts);
  } catch (error) {
    return next(error);
  }
};

export const updateAccount = async (req, res, next) => {
  const { accountId } = req.params;
  const properties = ["name", "description", "balance"];

  const { account, error } = await hasUserAccessToAccount(
    req.user._id,
    accountId
  );
  if (error) return next(error);

  const dataToUpdate = {};
  properties.forEach((prop) => {
    if (req.body[prop] && req.body[prop] !== account[prop])
      dataToUpdate[prop] = req.body[prop];
  });

  if (Object.keys(dataToUpdate).length === 0)
    return res.status(200).json({ message: "no changes detectected!" });

  try {
    const updatedAccount = await Account.findByIdAndUpdate(
      account._id,
      dataToUpdate,
      { new: true }
    ).populate("user");
    return res.status(200).json(updatedAccount);
  } catch (error) {
    return next(error);
  }
};

export const deleteAccount = async (req, res, next) => {
  const { accountId } = req.params;

  const { account, error } = await hasUserAccessToAccount(
    req.user._id,
    accountId
  );
  if (error) return next(error);

  try {
    await Account.deleteOne({ _id: account._id });
    return res.status(200).json({ message: "account deleted successfully!" });
  } catch (error) {
    return next(error);
  }
};
