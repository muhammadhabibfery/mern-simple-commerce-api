import UnauthorizedError from "../../errors/UnauthorizedError.js";

const adminAuthorizationHandler = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role))
			throw new UnauthorizedError("Unauthorized");
		next();
	};
};

export default adminAuthorizationHandler;
