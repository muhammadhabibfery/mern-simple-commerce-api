import express from "express";
import authenticationHandler from "../application/middlewares/authenticationHandler.js";
import userRouter from "./api-segment/userRouter.js";

const authenticatedApiRouter = express.Router();

authenticatedApiRouter.use(authenticationHandler);
authenticatedApiRouter.use("/users", userRouter);

export default authenticatedApiRouter;
