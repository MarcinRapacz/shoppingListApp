declare namespace Express {
  interface Request {
    user: import("../../src/components/user/UserModel").UserInterface;
  }
}
