import express from "express";
import { handleValidation } from "../../tools/handleValidation";
import handleError from "../../tools/handleError";
import ShoppingListModel from "./ShoppingListModel";
import {
  IResponse,
  IRequestShoppingListBody,
  TypeRequestShoppingListParams,
  IRequestMemberBody,
} from "./ShoppingListInterface";
import UserModel from "../user/UserModel";
import ProductModel from "../product/ProductModel";

export const create = async (
  req: express.Request<{}, {}, IRequestShoppingListBody>,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const { name } = req.body;
    const { id } = req.user;

    const shoppingList = new ShoppingListModel();
    shoppingList.name = name;
    shoppingList.status = "awaiting";
    shoppingList.members = [id];

    await shoppingList.save();

    return res
      .status(201)
      .json({ message: "Shopping list created", shoppingList });
  } catch (error) {
    next(error);
  }
};

// Get list
export const list = async (
  req: express.Request,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const { id } = req.user;
    const shoppingList = await ShoppingListModel.find({ members: id });

    return res
      .status(200)
      .json({ message: "Your shopping list", list: shoppingList });
  } catch (error) {
    next(error);
  }
};

// Get
export const get = async (
  req: express.Request<
    TypeRequestShoppingListParams,
    {},
    IRequestShoppingListBody
  >,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const userId = req.user.id;
    const shoppingListId = req.params.id;

    const shoppingList = await ShoppingListModel.findOne({
      _id: shoppingListId,
      members: userId,
    }).populate("products");

    if (!shoppingList) {
      return handleError({
        message: "ShoppingList not exists",
        statusCode: 404,
      });
    }

    return res.status(200).json({ message: "Shopping list", shoppingList });
  } catch (error) {
    next(error);
  }
};

// Update
export const update = async (
  req: express.Request<
    TypeRequestShoppingListParams,
    {},
    IRequestShoppingListBody
  >,
  res: express.Response<IResponse>,
  next: express.NextFunction
) => {
  try {
    handleValidation(req);

    const userId = req.user.id;
    const shoppingListId = req.params.id;
    const { name, status } = req.body;

    const shoppingList = await ShoppingListModel.findOne({
      _id: shoppingListId,
      members: userId,
    }).populate("products");

    if (!shoppingList) {
      return handleError({
        message: "Shopping list not found",
        statusCode: 404,
      });
    }

    if (name) {
      shoppingList.name = name;
    }

    if (status) {
      shoppingList.status = status;
      shoppingList.products = shoppingList.products
        .filter((product) => {
          if (product.status === "in") {
            product.remove();
            return false;
          }

          return true;
        })
        .map((product) => {
          product.status = "awaiting";
          return product;
        });
    }

    await shoppingList.save();

    return res
      .status(200)
      .json({ message: "Shopping list updated", shoppingList });
  } catch (error) {
    next(error);
  }
};

// Add member
export const toggleMember = async (
  req: express.Request<TypeRequestShoppingListParams, {}, IRequestMemberBody>,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { email } = req.body;
    const { id } = req.params;

    const shoppingList = await ShoppingListModel.findOne({
      _id: id,
      members: req.user._id,
    });

    if (!shoppingList) {
      return handleError({
        message: "Shopping List not found",
        statusCode: 404,
      });
    }

    const member = await UserModel.findOne({ email });

    if (!member) {
      return handleError({
        message: "User not found",
        statusCode: 404,
      });
    }

    if (shoppingList.members.includes(member._id)) {
      shoppingList.members = shoppingList.members.filter(
        (memberId) => memberId.toString() !== member._id.toString()
      );
    } else {
      shoppingList.members.push(member._id);
    }

    if (shoppingList.members.length) {
      await shoppingList.save();
    } else {
      shoppingList.products.forEach(async (productId) => {
        await ProductModel.findByIdAndRemove(productId);
      });
      await shoppingList.remove();
    }

    return res.status(200).json({ message: "Shopping list members updated" });
  } catch (error) {
    next(error);
  }
};
