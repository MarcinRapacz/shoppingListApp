import express from "express";
import passport from "../../config/passport";
import * as controller from "./UserController";

const router = express.Router();
router.use(passport.initialize());

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { scope: ["email"] }),
  controller.login
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  controller.login
);

export default router;
