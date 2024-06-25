import NotFoundError from "../../errors/notFoundError.js";
import {
	checkItem,
	convertToSlug,
	setParams,
	wrapData,
} from "../../utils/global.js";
import Category from "../models/categoryModel.js";
import { categoryValidation } from "../validations/categoryValidation.js";
import validate from "../validations/validate.js";

const notFoundErrMessage = "Category not found";

const index = async ({ query, user }) => {
	const { search, page, size, skip } = query;
	let queryObject = {};
	const sortList = "-createdAt -_id";

	if (search)
		if (search) queryObject.name = { $regex: search, $options: "i" };

	const categories = await Category.find(queryObject)
		.sort(sortList)
		.skip(skip)
		.limit(size);
	const totalCategories = await Category.countDocuments(queryObject);

	return wrapData(categories, totalCategories, { page, size });
};

const create = async ({ body, user }) => {
	let data = await validate(categoryValidation, body, null, true);
	data = addAdditionalData(data, user.id);
	await Category.create(data);
};

const update = async ({ params, body, user }) => {
	let data = await validate(categoryValidation, body, null, true);
	data = addAdditionalData(data, user.id, false);
	const payload = setParams(
		"update",
		Category,
		{ _id: params.id },
		new NotFoundError(notFoundErrMessage),
		data
	);

	await checkItem(payload);
};

const remove = async ({ params }) => {
	const payload = setParams(
		"delete",
		Category,
		{ _id: params.id },
		new NotFoundError(notFoundErrMessage)
	);

	await checkItem(payload);
};

const addAdditionalData = (data, userId, create = true) => {
	let result = { ...data, slug: convertToSlug(data.name) };
	result = create
		? { ...result, createdBy: userId }
		: { ...result, updatedBy: userId };
	return result;
};

export default { index, create, update, remove };
