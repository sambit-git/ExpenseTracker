import mongoose from "mongoose";

const transactionTypes = ["credit", "debit"];

const transactionSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: transactionTypes },
    defaultTransactionType: {
      type: String,
      enum: transactionTypes,
      default: "debit",
    },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
