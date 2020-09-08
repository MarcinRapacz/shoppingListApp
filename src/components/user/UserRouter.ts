import express from "express";
import * as controller from "./UserController";
import * as validator from "./UserValidator";

const router = express.Router();

// Auth by email
router.post("/create", validator.create, controller.create);
router.post("/login", validator.login, controller.login);

// Auth by facebook
router.post("/facebook", validator.facebook, controller.facebook);

// Auth by google
router.post("/google", validator.google, controller.google);

export default router;
