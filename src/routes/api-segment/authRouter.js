import express from "express";
import AuthController from "../../application/controllers/authController.js";
import authenticationHandler from "../../application/middlewares/authenticationHandler.js";

const authRouter = express.Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/verify", AuthController.verify);
authRouter.post("/login", AuthController.login);
authRouter.post("/forgot-password", AuthController.forgotPassword);
authRouter.post("/logout", [authenticationHandler], AuthController.logout);

export default authRouter;
