import NotFoundError from "../../errors/notFoundError.js";
import { modelAction, wrapData } from "../../utils/global.js";
import { availableCategoryFields } from "../models/categoryModel.js";
import { availableProductFields } from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import { reviewValidation } from "../validations/reviewValidation.js";
import validate from "../validations/validate.js";

const notFoundErrMessage = "Review not found";

const index = async ({ query }) => {
	const { page, size, skip } = query;
	const sortList = "-createdAt -_id";

	const reviews = await Review.find({})
		.populate({ path: "product", select: availableProductFields, populate: { path: "category", select: availableCategoryFields } })
		.sort(sortList)
		.skip(skip)
		.limit(size);
	const totalReviews = await Review.countDocuments({});
	return wrapData(reviews, totalReviews, { page, size });
};

const create = async (req) => {
	const data = await getData(req);
	await modelAction({
		model: Review,
		action: "create",
		data,
	});
};

const update = async (req) => {
	const data = await getData(req);
	await modelAction({
		model: Review,
		action: "update",
		queries: { _id: req.params.id },
		errClass: new NotFoundError(notFoundErrMessage),
		data,
		additonalData: req.user,
	});
};

const remove = async ({ params, user }) => {
	await modelAction({
		model: Review,
		action: "delete",
		queries: { _id: params.id },
		errClass: new NotFoundError(notFoundErrMessage),
		additonalData: user,
	});
};

const getData = async (req) => {
	let data = await validate(reviewValidation, req.body, true, { context: { req } });
	data = { ...data, user: req.user.id };
	return data;
};

export default { index, create, update, remove };
