import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errResponse } from "../utils/exception_response.util.js";

import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  const { username, fullName, email, password } = req.body;
  if (!(username && fullName && email && password)) {
    return next(errResponse(400, "insufficient data!"));
  }

  const hashPassword = bcryptjs.hashSync(password);
  const newUser = User({ username, fullName, email, password: hashPassword });

  try {
    const user = await newUser.save();
    return res.status(201).json(newUser);
  } catch (error) {
    if (error.message.includes("duplicate key error collection")) {
      if (error.message.includes("username"))
        return next(errResponse(500, "Username already taken!"));
      else if (error.message.includes("email"))
        return next(errResponse(500, "Email already taken!"));
    }
    return next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!(username || email) || !password) {
    return next(
      errResponse(400, "username/email and password is needed to login.")
    );
  }

  try {
    let user;
    if (username) user = await User.findOne({ username });
    else user = await User.findOne({ email });

    if (!user) return next(errResponse(400, "user doesn't exist."));

    if (!bcryptjs.compareSync(password, user.password))
      return next(errResponse(400, "you've entered an incorrect password."));

    const token = jwt.sign({ user_id: user._id }, process.env.JWT_SECRET_KEY);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
      })
      .json(user);
  } catch (error) {
    return next(error);
  }
};

export const showAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};

export const isLoggedIn = (req, res, next) => {
  return res.json(req.user);
};
