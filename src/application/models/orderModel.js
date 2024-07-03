import mongoose from "mongoose";

export const orderStatusEnum = ["pending", "failed", "paid", "delivered", "canceled"];

const orderItem = mongoose.Schema({
	name: {
		type: String,
	},
	image: {
		type: String,
	},
	price: {
		type: Number,
	},
	amount: {
		type: Number,
	},
	product: {
		type: mongoose.Types.ObjectId,
		ref: "Product",
	},
});

const orderSchema = mongoose.Schema(
	{
		tax: {
			type: Number,
		},
		shippingFee: {
			type: Number,
		},
		subTotal: {
			type: Number,
		},
		total: {
			type: Number,
		},
		orderItems: {
			type: [orderItem],
		},
		status: {
			type: String,
			enum: orderStatusEnum,
			default: orderStatusEnum[0],
		},
		user: {
			type: mongoose.Types.ObjectId,
			ref: "User",
		},
		clientSecret: {
			type: String,
		},
		paymentIntentId: {
			type: String,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Order", orderSchema);
