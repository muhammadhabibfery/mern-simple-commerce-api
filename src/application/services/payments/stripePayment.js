import Stripe from "stripe";
import { orderStatusEnum } from "../../models/orderModel.js";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createPayment = async (total) => {
	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: "sgd",
		automatic_payment_methods: {
			enabled: true,
		},
	});
	return { paymentIntentId: paymentIntent.id, clientSecret: paymentIntent.client_secret };
};

const retrievePayment = async (paymentIntentId) => {
	let status;
	const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

	switch (paymentIntent.status) {
		case "succeeded":
			status = orderStatusEnum[2];
			break;
		case "processing":
			status = orderStatusEnum[3];
			break;
		default:
			status = orderStatusEnum[1];
	}

	return { orderStatus: status, paymentIntentStatus: paymentIntent.status };
};

export default { createPayment, retrievePayment };
