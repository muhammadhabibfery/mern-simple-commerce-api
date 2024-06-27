import Joi from "joi";
import { modelAction } from "../../utils/global.js";
import Product from "../models/productModel.js";
import ValidationError from "../../errors/validationError.js";
import Review from "../models/reviewModel.js";

export const reviewValidation = Joi.object({
	title: Joi.string()
		.max(100)
		.required()
		.external(async (value, helpers) => {
			const { req } = helpers.prefs.context;
			if (req.method === "POST") {
				const { product } = helpers.state.ancestors[0];
				const { user } = req;
				const alreadySubmittedReview = await Review.findOne({ product, user: user.id });
				if (alreadySubmittedReview) throw new ValidationError(`"Title" already submitted, only 1 review per product`);
			}
			return value;
		}),
	comment: Joi.string().max(1000).required(),
	rating: Joi.number().min(1).max(5).required(),
	product: Joi.required().external(async (value) => {
		await modelAction({
			model: Product,
			action: "get",
			queries: { _id: value },
			errClass: new ValidationError(`"Product" not found`),
		});
		return value;
	}),
});
