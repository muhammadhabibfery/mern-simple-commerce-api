import jwt from "jsonwebtoken";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import Token from "../models/tokenModel.js";
import User from "../models/userModel.js";

const authenticationHandler = async (req, res, next) => {
	const unauthenticatedMessage = "Unauthenticated";

	try {
		let user;
		const { accessToken, refreshToken } = req?.signedCookies;
		const authHeader = req.headers.authorization;

		if (authHeader && authHeader.startsWith("Bearer ")) {
			const token = authHeader.split(" ")[1];
			user = jwt.verify(token, process.env.JWT_SECRET_KEY);
		}
		if (accessToken) {
			user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
		}
		if (!accessToken && refreshToken) {
			const { refreshToken: validRefreshToken } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
			const modelData = { action: "get", errClass: new UnauthenticatedError(unauthenticatedMessage) };
			await modelAction({
				...modelData,
				model: Token,
				queries: { refreshToken: validRefreshToken, user: user.id },
			});
			user = await modelAction({ ...modelData, model: User, queries: { _id: user.id } });
			attachCookies({ res, user, refreshToken: validRefreshToken });
		}

		if (!user) throw new UnauthenticatedError(unauthenticatedMessage);

		req.user = user;
		next();
	} catch (error) {
		throw new UnauthenticatedError(unauthenticatedMessage);
	}
};

export default authenticationHandler;
