import express from "express";
import handleError from "../tools/handleError";
import User from "../components/User/UserModel";
import { JWT } from "../tools/jsonWebToken";

export const secure = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      handleError({ msg: "Token not found", statusCode: 400 });
      return;
    }

    const [_, jsonWebToken] = bearerToken.split(" ");

    const isValid = JWT.check(jsonWebToken);

    if (!isValid) {
      handleError({ msg: "Token is not valid", statusCode: 422 });
      return;
    }

    const decodedToken: any = JWT.decode(jsonWebToken);
    const user = await User.findById(decodedToken.id);

    if (!user) {
      handleError({ msg: "User not found", statusCode: 404 });
      return;
    }
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};
