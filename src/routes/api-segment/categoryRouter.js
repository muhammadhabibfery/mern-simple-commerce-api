import express from "express";
import userRoleAuthorizationHandler from "../../application/middlewares/userRoleAuthorizationHandler.js";
import CategoryController from "../../application/controllers/categoryController.js";

const categoryRouter = express.Router();

categoryRouter.use(userRoleAuthorizationHandler("admin"));
categoryRouter
	.route("/")
	.get(CategoryController.index)
	.post(CategoryController.create);
categoryRouter
	.route("/:id")
	.put(CategoryController.update)
	.delete(CategoryController.remove);

export default categoryRouter;
