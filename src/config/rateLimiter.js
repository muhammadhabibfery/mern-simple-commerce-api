const rateLimiterOption = {
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message: {
		code: 429,
		message: "Too many requests, please try again later.",
	},
};

export default rateLimiterOption;
