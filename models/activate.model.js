import mongoose from "mongoose";
import User from "./user.model";

const activateSchema = mongoose.Schema(
  { user: { type: mongoose.Schema.Types.ObjectId, ref: User } },
  { timestamps: true }
);
