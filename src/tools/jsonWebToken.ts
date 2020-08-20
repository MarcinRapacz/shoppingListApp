import jsonwebtoken from "jsonwebtoken";
import { UserInterface } from "../components/user/UserModel";

export class JWT {
  static create(user: UserInterface): string {
    const { id, email, photoURL } = user;
    const token = jsonwebtoken.sign(
      { id, email, photoURL },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "30d",
      }
    );
    return token;
  }

  static check(token: string): boolean {
    try {
      return !!jsonwebtoken.verify(token, process.env.JWT_SECRET as string);
    } catch (error) {
      return false;
    }
  }

  static decode(token: string) {
    return jsonwebtoken.decode(token);
  }
}
