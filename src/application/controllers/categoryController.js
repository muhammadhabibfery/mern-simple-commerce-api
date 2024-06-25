import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import CategoryService from "../services/categoryService.js";

const index = async (req, res) => {
	const categories = await CategoryService.index(req);
	return wrapResponse(res, StatusCodes.OK, "", categories);
};

const create = async (req, res) => {
	await CategoryService.create(req);
	return wrapResponse(
		res,
		StatusCodes.CREATED,
		"Category created successfully"
	);
};

const update = async (req, res) => {
	await CategoryService.update(req);
	return wrapResponse(res, StatusCodes.OK, "Category updated successfully");
};

const remove = async (req, res) => {
	await CategoryService.remove(req);
	return wrapResponse(res, StatusCodes.OK, "Category deleted successfully");
};

export default { index, create, update, remove };
