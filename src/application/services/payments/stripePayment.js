import Stripe from "stripe";
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
			status = "paid";
			break;
		case "processing":
			status = "delivered";
			break;
		default:
			status = "failed";
	}

	return { orderStatus: status, paymentIntentStatus: paymentIntent.status };
};

export default { createPayment, retrievePayment };
