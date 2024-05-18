import Category from "../models/category.model.js";
import { errResponse } from "../utils/exception_response.util.js";

export const hasUserAccessToCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  if (!categoryId)
    return next(400, "Invalid URI, couldn't find categoryId in URI");

  try {
    const category = await Category.findById(categoryId);
    if (!category) return next(errResponse(404, "Category not found!"));

    if (!category.user.equals(req.user._id))
      return next(
        errResponse(403, "You're not authorized to delete this category")
      );

    req.category = category;
    return next();
  } catch (error) {
    return next(
      errResponse(500, "Internal server error while fetching category")
    );
  }
};
