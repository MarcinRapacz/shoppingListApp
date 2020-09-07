import { check, param } from "express-validator";

const avilableStatus = ["awaiting", "active"];

export const create = [check("name").isLength({ min: 2 })];

export const get = [param("id").isMongoId()];

export const update = [
  param("id").isMongoId(),
  check("name").isLength({ min: 2 }).optional(),
  check("status")
    .custom((value) => avilableStatus.includes(value))
    .optional(),
];

export const toggleMember = [param("id").isMongoId(), check("email").isEmail()];
