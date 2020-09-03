import { check, param } from "express-validator";

const avilableStatus = ["awaiting", "in", "missing"];

export const create = [
  check("shoppingListId").isMongoId(),
  check("name").isLength({ min: 2 }),
];

export const update = [
  param("id").isMongoId(),
  check("name").isLength({ min: 2 }).optional(),
  check("status")
    .custom((value) => avilableStatus.includes(value))
    .optional(),
];

export const remove = [param("id").isMongoId()];
