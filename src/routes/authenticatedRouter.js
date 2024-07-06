import express from "express";
import authenticationHandler from "../application/middlewares/authenticationHandler.js";
import userRouter from "./api-segment/userRouter.js";
import profileRouter from "./api-segment/profileRouter.js";
import categoryRouter from "./api-segment/categoryRouter.js";
import { productRouter } from "./api-segment/productRouter.js";
import { reviewRouter } from "./api-segment/reviewRouter.js";
import { adminOrderRouter, orderRouter } from "./api-segment/orderRouter.js";

const authenticatedApiRouter = express.Router();

authenticatedApiRouter.use("/users", [authenticationHandler], userRouter);
authenticatedApiRouter.use("/profile", [authenticationHandler], profileRouter);
authenticatedApiRouter.use("/categories", [authenticationHandler], categoryRouter);
authenticatedApiRouter.use("/products/admin", [authenticationHandler], productRouter);
authenticatedApiRouter.use("/reviews", [authenticationHandler], reviewRouter);
authenticatedApiRouter.use("/orders", [authenticationHandler], adminOrderRouter, orderRouter);

export default authenticatedApiRouter;
