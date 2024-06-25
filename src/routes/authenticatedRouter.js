import express from "express";
import authenticationHandler from "../application/middlewares/authenticationHandler.js";
import userRouter from "./api-segment/userRouter.js";
import profileRouter from "./api-segment/profileRouter.js";

const authenticatedApiRouter = express.Router();

authenticatedApiRouter.use(authenticationHandler);
authenticatedApiRouter.use("/users", userRouter);
authenticatedApiRouter.use("/profile", profileRouter);

export default authenticatedApiRouter;
