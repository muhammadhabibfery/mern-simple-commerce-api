import Joi from "joi";
import Product from "../models/productModel.js";
import { convertToSlug } from "../../utils/global.js";
import ValidationError from "../../errors/validationError.js";

const availableImageTypes = ["jpg", "png"];

export const productValidation = Joi.object({
	name: Joi.string()
		.min(3)
		.max(100)
		.required()
		.external(async (value) => {
			const slug = convertToSlug(value);
			const duplicateProduct = await Product.findOne({ slug });
			if (duplicateProduct)
				throw new ValidationError(`"name" has been created`);
			return value;
		}),
	price: Joi.number().min(1).required(),
	image: Joi.required()
		.custom((value, helpers) => {
			if (!value) return helpers.error("any.required");
			if (value.size > 1 * 1000000) return helpers.error("any.size");
			if (!value.mimetype.startsWith("image"))
				return helpers.error("any.mimetype");
			if (!availableImageTypes.includes(value.name.split(".").at(-1)))
				return helpers.error("any.imagetype");

			return value;
		})
		.message({
			"any.size": `"image" is not allowed to be empty`,
			"any.size": `"image" size must be less than 1 MB`,
			"any.mimetype": `"image" must be an image type`,
			"any.imagetype": `"image" must in ${availableImageTypes.join(
				"/"
			)} type`,
		}),
});
