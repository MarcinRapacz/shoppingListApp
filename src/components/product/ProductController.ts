import express from "express";
import { handleValidation } from "../../tools/handleValidation";
import handleError from "../../tools/handleError";
import ProductModel from "./ProductModel";
import {
  IResponse,
  IRequestProductBody,
  TypeRequestProductParams,
} from "./IProduct";
import ShoppingListModel from "../shoppingList/ShoppingListModel";

export const create = async (
  req: express.Request<{}, {}, IRequestProductBody>,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);
    const { name, shoppingListId } = req.body;
    const shoppingList = await ShoppingListModel.findById(shoppingListId);

    if (!shoppingList) {
      return handleError({
        message: "Shopping list not found",
        statusCode: 404,
      });
    }

    if (!shoppingList.members.includes(req.user.id)) {
      return handleError({
        message: "You are not a member",
        statusCode: 403,
      });
    }

    const product = new ProductModel();
    product.name = name;
    product.status = "awaiting";

    await product.save();

    shoppingList.products.push(product);
    await shoppingList.save();

    return res.status(201).json({ message: "Product added", product });
  } catch (error) {
    next(error);
  }
};

// Update
export const update = async (
  req: express.Request<TypeRequestProductParams, {}, IRequestProductBody>,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);
    const { name, status } = req.body;
    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return handleError({ message: "Product not found", statusCode: 404 });
    }

    const shoppingList = await ShoppingListModel.findOne({ products: product });
    if (!shoppingList) {
      return handleError({ message: "Product not found", statusCode: 404 });
    }

    if (!shoppingList.members.includes(req.user.id)) {
      return handleError({
        message: "You are not a member",
        statusCode: 403,
      });
    }

    if (name) {
      product.name = name;
    }

    if (status) {
      product.status = status;
    }

    await product.save();

    return res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    next(error);
  }
};

// Remove
export const remove = async (
  req: express.Request<TypeRequestProductParams, {}, IRequestProductBody>,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const { id } = req.params;

    const product = await ProductModel.findById(id);
    if (!product) {
      return handleError({ message: "Product not found", statusCode: 404 });
    }

    const shoppingList = await ShoppingListModel.findOne({ products: product });
    if (!shoppingList) {
      return handleError({ message: "Product not found", statusCode: 404 });
    }

    if (!shoppingList.members.includes(req.user.id)) {
      return handleError({
        message: "You are not a member",
        statusCode: 403,
      });
    }

    shoppingList.products = shoppingList.products.filter(
      (p) => p._id.toString() !== product._id.toString()
    );

    await Promise.all([shoppingList.save(), product.remove()]);

    return res.status(200).json({ message: "Product removed" });
  } catch (error) {
    next(error);
  }
};
