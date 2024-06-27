import express from "express";
import ReviewController from "../../application/controllers/reviewController.js";

export const reviewRouter = express.Router();
export const publicReviewRouter = express.Router();

publicReviewRouter.get("/", ReviewController.index);

reviewRouter.post("/", ReviewController.create);
reviewRouter
	.route("/:id")
	.put(ReviewController.update)
	.delete(ReviewController.remove);
