import { check } from "express-validator";

export const login = [
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
];

export const create = [
  check("email").isEmail(),
  check("password").isLength({ min: 8 }),
];

export const facebook = [
  check("id").isString(),
  check("signedRequest").isString(),
  check("accessToken").isString(),
];

export const google = [check("idToken").isString()];
