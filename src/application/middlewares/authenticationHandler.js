import jwt from "jsonwebtoken";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";

const authenticationHandler = async (req, res, next) => {
	try {
		let token = req?.signedCookies?.refreshToken;
		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith("Bearer "))
			token = token.split(" ")[1];

		const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = user;
		next();
	} catch (error) {
		throw new UnauthenticatedError("Unauthenticated");
	}
};

export default authenticationHandler;
