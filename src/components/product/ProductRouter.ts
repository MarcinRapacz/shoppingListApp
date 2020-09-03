import express from "express";
import * as controller from "./ProductController";
import * as validator from "./ProductValidator";
import secure from "../../middlewares/secure";

const router = express.Router();

router.use(secure);

router.post("/", validator.create, controller.create);
router.put("/:id", validator.update, controller.update);
router.delete("/:id", validator.remove, controller.remove);

export default router;
