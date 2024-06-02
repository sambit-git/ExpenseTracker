import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    balance: { type: Number },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
