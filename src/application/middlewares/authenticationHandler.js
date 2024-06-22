import jwt from "jsonwebtoken";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import User from "../models/userModel.js";

const authenticationHandler = async (req, res, next) => {
	const unauthenticatedMessage = "Unauthenticated";

	try {
		let token = req.headers.authorization;
		if (!token || !token.startsWith("Bearer "))
			throw new UnauthenticatedError(unauthenticatedMessage);

		token = token.split(" ")[1];
		const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = user;

		next();
	} catch (error) {
		throw new UnauthenticatedError(unauthenticatedMessage);
	}
};

export default authenticationHandler;
