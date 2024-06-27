import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import ReviewService from "../services/reviewService.js";

const index = async (req, res) => {
	const reviews = await ReviewService.index(req);
	return wrapResponse(res, StatusCodes.OK, "", reviews);
};

const create = async (req, res) => {
	await ReviewService.create(req);
	return wrapResponse(res, StatusCodes.OK, "Review created successfully");
};

const update = async (req, res) => {
	await ReviewService.update(req);
	return wrapResponse(res, StatusCodes.OK, "Review updated successfully");
};

const remove = async (req, res) => {
	await ReviewService.remove(req);
	return wrapResponse(res, StatusCodes.OK, "Review deleted successfully");
};

export default { index, create, update, remove };
