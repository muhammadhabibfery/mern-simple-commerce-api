import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import ProductService from "../services/productService.js";

const index = async (req, res) => {
	const products = await ProductService.index(req);
	return wrapResponse(res, StatusCodes.OK, "", products);
};

const create = async (req, res) => {
	await ProductService.create(req);
	return wrapResponse(res, StatusCodes.CREATED, "Product created successfully");
};

const update = async (req, res) => {
	await ProductService.update(req);
	return wrapResponse(res, StatusCodes.OK, "Product updated successfully");
};

const remove = async (req, res) => {
	await ProductService.remove(req);
	return wrapResponse(res, StatusCodes.OK, "Product deleted successfully");
};

export default { index, create, update, remove };
