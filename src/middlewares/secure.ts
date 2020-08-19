import expores from "express";
import User from "../components/User/UserModel";
import handleError from "../tools/handleError";
import { JWT } from "../tools/jsonWebToken";

interface DecodedToken {
  id: string;
  email: string;
  photoURL: string;
  iat: number;
  exp: number;
}

export default async (
  req: expores.Request,
  res: expores.Response,
  next: expores.NextFunction
) => {
  try {
    // Wez token
    // const token = req.header
    const bearerToken = req.header("authorization");

    if (!bearerToken) {
      return handleError({ message: "Token not found", statusCode: 404 });
    }

    const [_, token] = bearerToken.split("Bearer ");
    if (!token) {
      return handleError({ message: "Token not found", statusCode: 404 });
    }

    // Zdekoduj token
    const decodedToken = JWT.decode(token) as DecodedToken;
    if (!decodedToken) {
      return handleError({ message: "Token not found", statusCode: 404 });
    }

    // Znajdz uzytkownika czy istnieje
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return handleError({ message: "User not found", statusCode: 404 });
    }

    // Przypisz go do requesta
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
