import express from "express";
import { handleValidation } from "../../tools/handleValidation";
import handleError from "../../tools/handleError";
import ShoppingListModel from "./ShoppingListModel";
import {
  IResponse,
  IRequestShoppingListBody,
  TypeRequestShoppingListParams,
} from "./ShoppingListInterface";

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
    });

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
    });

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
    }

    await shoppingList.save();

    return res
      .status(200)
      .json({ message: "Shopping list updated", shoppingList });
  } catch (error) {
    next(error);
  }
};

// Remove?

// Add member

// Remove member

// Add produkt

// Remove produkt
