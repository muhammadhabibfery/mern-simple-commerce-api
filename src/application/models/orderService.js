import Order from "./orderModel.js";

const getAllOrders = async (req) => {
	return "Get all orders";
};

const getUserOrders = async (req) => {
	return "Get user orders";
};

const create = async (req) => {
	return "Create order";
};
const update = async (req) => {
	return "Update order";
};
const remove = async (req) => {
	return "Remove order";
};

export default { getAllOrders, getUserOrders, create, update, remove };
