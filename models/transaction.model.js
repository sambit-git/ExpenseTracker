import mongoose from "mongoose";

const transactionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    datetime: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
    transaction_type: { type: String },
    default_transaction_type: {
      type: String,
      enum: ["credit", "debit"],
      default: "debit",
    },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
