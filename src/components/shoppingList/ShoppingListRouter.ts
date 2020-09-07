import express from "express";
import * as controller from "./ShoppingListController";
import * as validator from "./ShoppingListValidator";
import secure from "../../middlewares/secure";

const router = express.Router();
router.use(secure);

router.get("/", controller.list);
router.post("/", validator.create, controller.create);
router.get("/:id", validator.get, controller.get);
router.put("/:id", validator.update, controller.update);
router.post(
  "/:id/toggleMember",
  validator.toggleMember,
  controller.toggleMember
);

export default router;
