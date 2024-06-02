import Category from "../models/category.model.js";
import { hasUserAccessToCategory } from "../utils/category.util.js";
import { errResponse } from "../utils/exception_response.util.js";

export const createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name)
    return next(
      errResponse(400, "category can't be created without a category name")
    );
  try {
    const category = await Category.create({
      name,
      description,
      user: req.user._id,
    });
    return res.status(201).json(category);
  } catch (error) {
    return next(error);
  }
};

export const allCategory = async (req, res, next) => {
  try {
    const categories = await Category.find({ user: req.user._id }).populate(
      "user"
    );
    return res.status(200).json(categories);
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  const { categoryId } = req.params;
  const properties = ["name", "description"];

  const { category, error } = await hasUserAccessToCategory(
    req.user._id,
    categoryId
  );
  if (error) return next(error);

  const dataToUpdate = {};
  properties.forEach((prop) => {
    if (req.body[prop] && req.body[prop] !== category[prop])
      dataToUpdate[prop] = req.body[prop];
  });
  if (Object.keys(dataToUpdate).length === 0)
    return res.status(200).json({ message: "no changes detectected!" });

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      category._id,
      dataToUpdate,
      { new: true }
    ).populate("user");
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  const { category, error } = await hasUserAccessToCategory(
    req.user._id,
    categoryId
  );
  if (error) return next(error);

  try {
    await Category.deleteOne({ _id: category._id });
    return res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    return next(error);
  }
};
