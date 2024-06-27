import NotFoundError from "../../errors/notFoundError.js";
import { convertToSlug, modelAction, wrapData } from "../../utils/global.js";
import Category from "../models/categoryModel.js";
import { categoryValidation } from "../validations/categoryValidation.js";
import validate from "../validations/validate.js";

const notFoundErrMessage = "Category not found";

const index = async ({ query }) => {
	const { search, page, size, skip } = query;
	let queryObject = {};
	const sortList = "-createdAt -_id";

	if (search) queryObject.name = { $regex: search, $options: "i" };

	const categories = await Category.find(queryObject).sort(sortList).skip(skip).limit(size);
	const totalCategories = await Category.countDocuments(queryObject);

	return wrapData(categories, totalCategories, { page, size });
};

const create = async ({ body, user }) => {
	let data = await validate(categoryValidation, body);
	data = addAdditionalData(data, user.id);

	await modelAction({
		model: Category,
		action: "create",
		data,
	});
};

const update = async ({ params, body, user }) => {
	let data = await validate(categoryValidation, body);
	data = addAdditionalData(data, user.id, false);

	await modelAction({
		model: Category,
		action: "update",
		queries: { _id: params.id },
		errClass: new NotFoundError(notFoundErrMessage),
		data,
	});
};

const remove = async ({ params }) => {
	await modelAction({
		model: Category,
		action: "delete",
		queries: { _id: params.id },
		errClass: new NotFoundError(notFoundErrMessage),
	});
};

const addAdditionalData = (data, userId, create = true) => {
	let result = { ...data, slug: convertToSlug(data.name) };
	result = create ? { ...result, createdBy: userId } : { ...result, updatedBy: userId };
	return result;
};

export default { index, create, update, remove };
