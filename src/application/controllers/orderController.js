import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import OrderService from "../models/orderService.js";

const getAllOrders = async (req, res) => {
	const orders = await OrderService.getAllOrders(req);
	return wrapResponse(res, StatusCodes.OK, "", orders);
};

const getUserOrders = async (req, res) => {
	const userOrders = await OrderService.getUserOrders(req);
	return wrapResponse(res, StatusCodes.OK, "", userOrders);
};

const create = async (req, res) => {
	const result = await OrderService.create(req);
	return wrapResponse(res, StatusCodes.CREATED, "Order created successfully", result);
};

const update = async (req, res) => {
	const result = await OrderService.update(req);
	return wrapResponse(res, StatusCodes.OK, "Order updated successfully", result);
};

export default { getAllOrders, getUserOrders, create, update };
