import express from "express";
import publicApiRouter from "./publicRouter.js";
import requestHandler from "../application/middlewares/requestHandler.js";
import authenticatedApiRouter from "./authenticatedRouter.js";

const router = express.Router();

router.use(requestHandler);
router.use(publicApiRouter);
router.use(authenticatedApiRouter);

export default router;
