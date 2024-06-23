import express from "express";
import authRouter from "./api-segment/authRouter.js";

const publicApiRouter = express.Router();

publicApiRouter.use("/auth", authRouter);

export default publicApiRouter;
