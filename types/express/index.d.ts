declare namespace Express {
  interface Request {
    user: import("../../components/User/UserModel").UserInterface | null;
  }
}
