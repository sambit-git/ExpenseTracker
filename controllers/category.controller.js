import Category from "../models/category.model.js";
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
  const category = req.category;
  const { name, description } = req.body;

  const dataToUpdate = {};

  if (name && name !== category.name) dataToUpdate.name = name;
  if (description && description !== category.description)
    dataToUpdate.description = description;

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
  const category = req.category;

  try {
    await Category.deleteOne({ _id: category._id });
    return res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    return next(error);
  }
};
