import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);
