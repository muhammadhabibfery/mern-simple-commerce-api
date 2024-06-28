import { operatorFilterRegEx } from "../../config/global.js";
import NotFoundError from "../../errors/notFoundError.js";
import { convertOperatorFilters, convertToSlug, modelAction, wrapData } from "../../utils/global.js";
import Product from "../models/productModel.js";
import { productValidation } from "../validations/productValidation.js";
import validate from "../validations/validate.js";
import FileHandler from "../../utils/fileHandler.js";
import { availableCategoryFields } from "../models/categoryModel.js";

const notFoundErrMessage = "Product not found";
const imageDirectory = "products";

const index = async ({ query }) => {
	const { search, category, colors, filters, freeShipping, page, size, skip } = query;
	let queryObject = {};
	const sortList = "-createdAt -_id";

	if (search) queryObject.name = { $regex: search, $options: "i" };
	if (category && category !== "all") queryObject.category = category;
	if (colors && colors !== "all") queryObject.colors = colors;
	if (filters) {
		const result = convertOperatorFilters(filters, ["price"], operatorFilterRegEx);
		if (result) queryObject = { ...queryObject, ...result };
	}
	if (freeShipping) queryObject.freeShipping = freeShipping;

	const products = await Product.find(queryObject)
		.populate({ path: "category", select: availableCategoryFields })
		.sort(sortList)
		.skip(skip)
		.limit(size);
	const totalProducts = await Product.countDocuments(queryObject);

	return wrapData(products, totalProducts, { page, size });
};

const create = async ({ body, files, user }) => {
	let data = await validate(productValidation, body, true, { files });
	const image = data.image;
	const imagePath = await FileHandler.setFilePath(image, imageDirectory);
	data = addAdditionalData(data, user.id, imagePath);

	await modelAction({
		model: Product,
		action: "create",
		data,
	});
	await FileHandler.upload(image, imagePath);
};

const update = async ({ params, body, files, user }) => {
	let data = await validate(productValidation, body, true, { files });
	const payload = {
		model: Product,
		action: "get",
		queries: { _id: params.id },
		errClass: new NotFoundError(notFoundErrMessage),
	};

	const oldImage = await modelAction(payload).then((product) => product.image);
	const image = data.image;
	const imagePath = await FileHandler.setFilePath(image, imageDirectory, oldImage);

	data = addAdditionalData(data, user.id, imagePath, false);
	payload = { ...payload, action: "update", data };

	await modelAction(payload);
	await FileHandler.upload(image, imagePath);
};

const remove = async ({ params }) => {
	await modelAction({
		model: Product,
		action: "delete",
		queries: { _id: params.id },
		errClass: new NotFoundError(notFoundErrMessage),
	});
};

const addAdditionalData = (data, userId, imagePath, create = true) => {
	let result = { ...data, slug: convertToSlug(data.name), image: imagePath };

	result = create ? { ...result, createdBy: userId } : { ...result, updatedBy: userId };
	return result;
};

export default { index, create, update, remove };
