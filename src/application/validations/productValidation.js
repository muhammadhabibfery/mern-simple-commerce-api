import Joi from "joi";
import Category from "../models/categoryModel.js";
import ValidationError from "../../errors/validationError.js";
import { modelAction } from "../../utils/global.js";

const availableImageTypes = ["jpg", "png"];

export const productValidation = Joi.object({
	name: Joi.string().min(3).max(100).required(),
	description: Joi.string().min(3).max(1000).required(),
	price: Joi.number().min(0).optional(),
	stock: Joi.number().min(0).optional(),
	colors: Joi.array().optional(),
	featured: Joi.bool().optional(),
	freeShipping: Joi.bool().optional(),
	category: Joi.required().external(async (value) => {
		await modelAction({
			model: Category,
			action: "get",
			queries: { _id: value },
			errClass: new ValidationError(`"category" not found`),
		});
		return value;
	}),
	image: Joi.required()
		.custom((value, helpers) => {
			if (!value) return helpers.error("any.required");
			if (value.size > 1 * 1000000) return helpers.error("any.size");
			if (!value.mimetype.startsWith("image")) return helpers.error("any.mimetype");
			if (!availableImageTypes.includes(value.name.split(".").at(-1))) return helpers.error("any.imagetype");

			value = { ...value, name: value.name.replaceAll("/", "") };
			return value;
		})
		.message({
			"any.size": `"image" is not allowed to be empty`,
			"any.size": `"image" size must be less than 1 MB`,
			"any.mimetype": `"image" must be an image type`,
			"any.imagetype": `"image" must in ${availableImageTypes.join("/")} type`,
		}),
});
