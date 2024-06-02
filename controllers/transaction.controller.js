import Transaction from "../models/transaction.model.js";
import {
  hasUserAccessToAccountAndCategory,
  hasUserAccessToTransaction,
} from "../utils/transactions.util.js";
import { errResponse } from "../utils/exception_response.util.js";

export const createTransaction = async (req, res, next) => {
  const {
    name,
    description,
    datetime,
    amount,
    transactionType,
    account,
    category,
  } = req.body;
  if (!name)
    return next(
      errResponse(
        400,
        "Transaction can't be created without a transaction name. e.g, food @xyz resturant"
      )
    );
  if (!amount)
    return next(errResponse(400, "Please provide your transaction amount"));

  const { hasAccess, error } = await hasUserAccessToAccountAndCategory(
    req.user._id,
    account,
    category
  );
  if (error) return next(error);

  try {
    const transaction = await Transaction.create({
      name,
      description,
      datetime,
      amount,
      transactionType,
      account,
      user: req.user._id,
      category,
    });
    return res.status(201).json(transaction);
  } catch (error) {
    return next(error);
  }
};

export const allTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      user: req.user._id,
    })
      .populate("user")
      .populate("category")
      .populate("account");
    return res.status(200).json(transactions);
  } catch (error) {
    return next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  const { transactionId } = req.params;

  const { transaction, error } = await hasUserAccessToTransaction(
    req.user._id,
    transactionId
  );
  if (error) return next(error);

  const dataToUpdate = {};
  const properties = [
    "name",
    "description",
    "datetime",
    "amount",
    "transactionType",
    "account",
    "category",
  ];

  properties.forEach((prop) => {
    if (req.body[prop] && req.body[prop] !== transaction[prop])
      dataToUpdate[prop] = req.body[prop];
  });

  if (Object.keys(dataToUpdate).length === 0)
    return res.status(200).json({ message: "no changes detectected!" });

  if ("account" in dataToUpdate || "category" in dataToUpdate) {
    const { hasAccess, error } = await hasUserAccessToAccountAndCategory(
      req.user._id,
      dataToUpdate.account,
      dataToUpdate.category
    );
    if (error) return next(error);
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      dataToUpdate,
      { new: true }
    )
      .populate("user")
      .populate("category");
    return res.status(200).json(updatedTransaction);
  } catch (error) {
    return next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  const { transactionId } = req.params;

  const { transaction, error } = await hasUserAccessToTransaction(
    req.user._id,
    transactionId
  );
  if (error) return next(error);

  try {
    await Transaction.deleteOne({ _id: transaction._id });
    return res
      .status(200)
      .json({ message: "transaction deleted successfully!" });
  } catch (error) {
    return next(error);
  }
};
