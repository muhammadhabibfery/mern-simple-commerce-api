import Joi from "joi";
import Product from "../models/productModel.js";
import { modelAction } from "../../utils/global.js";
import ValidationError from "../../errors/validationError.js";

export const createOrderValidation = Joi.object({
	tax: Joi.number().min(0).required(),
	shippingFee: Joi.number().min(0).required(),
	items: Joi.array()
		.min(1)
		.required()
		.external(async (value, helpers) => {
			let productItems = [];

			for (const item of value) {
				const product = await modelAction({
					model: Product,
					action: "get",
					queries: { _id: item.product },
					errClass: new ValidationError(helpers.message(`{{ #label }} ${item.name} not found`)),
				});
				const productItem = isMatchProduct(item, product, helpers);
				productItems = [...productItems, isMatchProduct(productItem, product, helpers)];
			}

			return productItems;
		}),
});

export const updateOrderValidation = Joi.object({
	paymentIntentId: Joi.string().required(),
	clientSecret: Joi.string().required(),
});

const isMatchProduct = (resourceProduct, dbProduct, helpers) => {
	resourceProduct = (({ name, price, image, amount, product }) => ({ name, price, image, amount, product }))(resourceProduct);

	for (const key in resourceProduct) {
		if (key !== "product") {
			if (key === "name") {
				if (resourceProduct[key].toLowerCase() !== dbProduct[key].toLowerCase()) {
					throw new ValidationError(helpers.message(`{{ #label }} ${resourceProduct.name} not found`));
				}
			} else if (key === "amount") {
				if (resourceProduct[key] < 1) {
					throw new ValidationError(helpers.message(`{{ #label }} quantity of ${resourceProduct.name} must be greater than 0`));
				}
				if (resourceProduct[key] > dbProduct.stock) {
					throw new ValidationError(helpers.message(`{{ #label }} insufficient ${resourceProduct.name} quantity`));
				}
			} else {
				if (resourceProduct[key] !== dbProduct[key]) {
					throw new ValidationError(helpers.message(`{{ #label }} ${resourceProduct.name} ${key} does not match`));
				}
			}
		}
	}

	return resourceProduct;
};
