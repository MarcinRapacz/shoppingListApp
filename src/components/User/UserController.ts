import express from "express";
import { JWT } from "../../tools/jsonWebToken";
import { UserInterface } from "./UserModel";

export const login = (req: express.Request, res: express.Response) => {
  const user = req.user as UserInterface;
  const token = JWT.create(user);
  res.status(200).json(token);
};
