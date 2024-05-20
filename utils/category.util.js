import Category from "../models/category.model.js";
import { errResponse } from "./exception_response.util.js";

export const hasUserAccessToCategory = async (userId, categoryId) => {
  if (!categoryId)
    return { error: errResponse(400, "CategoryId is not provided!") };

  try {
    const category = await Category.findById(categoryId);
    if (!category) return { error: errResponse(404, "Category not found!") };

    if (!category.user.equals(userId))
      return { error: errResponse(403, "Unauthorized access") };

    return { category };
  } catch (err) {
    return { error: errResponse(500, `Internal server error: ${err}`) };
  }
};
