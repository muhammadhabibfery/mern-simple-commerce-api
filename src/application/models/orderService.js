import { modelAction, wrapData } from "../../utils/global.js";
import StripePayment from "../services/payments/stripePayment.js";
import { createOrderValidation, updateOrderValidation } from "../validations/orderValidation.js";
import validate from "../validations/validate.js";
import Order from "./orderModel.js";
import { availableUserFields } from "./userModel.js";
import NotFoundError from "../../errors/notFoundError.js";

let sortList = "-createdAt -_id";

const getAllOrders = async ({ query }) => {
	const { search, status, page, size, skip } = query;
	let queryObject = {};

	if (search) queryObject.user = { $regex: search, $options: "i" };
	if (status) queryObject.status = status;

	const orders = await Order.find(queryObject)
		.populate({ path: "user", select: availableUserFields })
		.sort(sortList)
		.skip(skip)
		.limit(size);
	const totalOrders = await Order.countDocuments(queryObject);

	return wrapData(orders, totalOrders, { page, size });
};

const getUserOrders = async ({ query, user }) => {
	const { status, page, size, skip } = query;
	const queryObject = { user: user.id };

	if (status) queryObject.status = status;

	const userOrders = await Order.find(queryObject).sort(sortList).skip(skip).limit(size);
	const totalUserOrders = await Order.countDocuments(queryObject);

	return wrapData(userOrders, totalUserOrders, { page, size });
};

const create = async ({ body, user }) => {
	let data = await validate(createOrderValidation, body, true);
	data = addAdditionalData(data, user.id);
	const { paymentIntentId, clientSecret } = await StripePayment.createPayment(data.total);
	data = { ...data, paymentIntentId, clientSecret };

	const order = await modelAction({
		model: Order,
		action: "create",
		data,
	});

	return { clientSecret, orderId: order._id };
};

const update = async ({ params, body }) => {
	const { id } = params;
	const { paymentIntentId, clientSecret } = await validate(updateOrderValidation, body);

	const order = await modelAction({
		model: Order,
		action: "get",
		queries: { _id: id, paymentIntentId, clientSecret },
		errClass: new NotFoundError("Order not found"),
	});

	const { orderStatus, paymentIntentStatus } = await StripePayment.retrievePayment(paymentIntentId);
	order.status = orderStatus;
	await order.save();

	return { status: paymentIntentStatus };
};

const addAdditionalData = (data, userId) => {
	const { tax, shippingFee, items: orderItems } = data;
	let subTotal = 0;

	for (const product of orderItems) {
		subTotal += product.price * product.amount;
	}
	const total = tax + shippingFee + subTotal;

	return { tax, shippingFee, subTotal, total, orderItems, user: userId };
};

export default { getAllOrders, getUserOrders, create, update };
