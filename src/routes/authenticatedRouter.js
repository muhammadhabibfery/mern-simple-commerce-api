import express from "express";
import authenticationHandler from "../application/middlewares/authenticationHandler.js";
import userRouter from "./api-segment/userRouter.js";
import profileRouter from "./api-segment/profileRouter.js";
import categoryRouter from "./api-segment/categoryRouter.js";
import { productRouter } from "./api-segment/productRouter.js";
import { reviewRouter } from "./api-segment/reviewRouter.js";
import { adminOrderRouter, orderRouter } from "./api-segment/orderRouter.js";

const authenticatedApiRouter = express.Router();

authenticatedApiRouter.use(authenticationHandler);
authenticatedApiRouter.use("/users", userRouter);
authenticatedApiRouter.use("/profile", profileRouter);
authenticatedApiRouter.use("/categories", categoryRouter);
authenticatedApiRouter.use("/products/admin", productRouter);
authenticatedApiRouter.use("/reviews", reviewRouter);
authenticatedApiRouter.use("/orders", adminOrderRouter, orderRouter);

export default authenticatedApiRouter;
