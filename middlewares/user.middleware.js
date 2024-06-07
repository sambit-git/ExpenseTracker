import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errResponse } from "../utils/exception_response.util.js";

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(errResponse(401, "authentication token is missing"));
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(errResponse(401, "Invalid authentication token."));
    } else if (error.name === "TokenExpiredError") {
      return next(errResponse(401, "Authentication token has expired."));
    } else {
      return next(
        errResponse(500, "Internal server error while verifying token.")
      );
    }
  }

  try {
    const user = await User.findById(decoded.user_id);
    if (!user) return next(errResponse(404, "user doesn't exist."));
    req.user = user.toJSON();
    return next();
  } catch (error) {
    return next(errResponse(500, "Internal server error while fetching user."));
  }
};
