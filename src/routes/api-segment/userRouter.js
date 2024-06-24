import express from "express";
import UserController from "../../application/controllers/userController.js";
import adminAuthorizationHandler from "../../application/middlewares/adminAuthorizationHandler.js";

const userRouter = express.Router();

userRouter.use(adminAuthorizationHandler("admin"));
userRouter.get("/", UserController.getAll);
userRouter.put("/:id", UserController.update);

export default userRouter;
