import express from "express";
import UserController from "../../application/controllers/userController.js";
import userRoleAuthorizationHandler from "../../application/middlewares/userRoleAuthorizationHandler.js";

const userRouter = express.Router();

userRouter.use(userRoleAuthorizationHandler("admin"));
userRouter.get("/", UserController.getAll);
userRouter.put("/:id", UserController.update);

export default userRouter;
