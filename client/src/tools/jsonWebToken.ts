import jsonwebtoken from "jsonwebtoken";
import { IAuth } from "../features/auth/IAuth";

export class JWT {
  static decode(token: string) {
    return jsonwebtoken.decode(token) as IAuth;
  }
}
