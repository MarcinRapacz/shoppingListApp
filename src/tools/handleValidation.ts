import express from "express";
import { validationResult } from "express-validator";
import handleErrors from "./handleError";

export const handleValidation = (req: express.Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    handleErrors({
      statusCode: 401,
      message: "Validation failed",
      content: errors.array(),
    });
  }
};
