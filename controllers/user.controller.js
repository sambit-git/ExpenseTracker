import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/user.model.js";

export const register = (req, res) => {
  const { username, fullName, email, password } = req.body;
  if (!(username && fullName && email && password)) {
    res.send("insufficient data!");
  }
  res.send("Good to go!");
};
