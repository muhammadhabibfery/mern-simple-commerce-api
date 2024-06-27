import express from "express";
import authRouter from "./api-segment/authRouter.js";
import { publicProductRouter } from "./api-segment/productRouter.js";
import { publicReviewRouter } from "./api-segment/reviewRouter.js";

const publicApiRouter = express.Router();

publicApiRouter.use("/auth", authRouter);
publicApiRouter.use("/products", publicProductRouter);
publicApiRouter.use("/reviews", publicReviewRouter);

export default publicApiRouter;
