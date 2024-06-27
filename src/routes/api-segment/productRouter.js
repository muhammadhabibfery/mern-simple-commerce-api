import express from "express";
import userRoleAuthorizationHandler from "../../application/middlewares/userRoleAuthorizationHandler.js";
import ProductController from "../../application/controllers/productController.js";

export const productRouter = express.Router();
export const publicProductRouter = express.Router();

publicProductRouter.get("/", ProductController.index);

productRouter.use(userRoleAuthorizationHandler("admin"));
productRouter.post("/", ProductController.create).put("/:id", ProductController.update).delete("/:id", ProductController.remove);
