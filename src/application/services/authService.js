import crypto from "crypto";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import { checkPassword, modelAction } from "../../utils/global.js";
import User from "../models/userModel.js";
import { loginValidation, registerValidation, verificationValidation } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import Email from "../emails/index.js";
import Token from "../models/tokenModel.js";

const register = async (req) => {
	let data = await validate(registerValidation, req.body);
	const verificationToken = crypto.randomBytes(50).toString("hex");
	data = { ...data, verificationToken };

	await modelAction({
		model: User,
		action: "create",
		data,
	});

	Email.verificationEmail({
		address: data.email,
		data: { name: data.name, token: verificationToken, origin: req },
	});
};

const verify = async ({ body }) => {
	const { email } = await validate(verificationValidation, body, true);
	const data = { verificationToken: null, verifiedAt: Date.now() };
	await modelAction({
		model: User,
		action: "update",
		queries: { email },
		errClass: new UnauthenticatedError("Verification failed"),
		data,
	});
};

const login = async (req) => {
	const errorMessage = "Invalid credential";
	const { email, password } = await validate(loginValidation, req.body);

	const user = await modelAction({
		model: User,
		action: "get",
		queries: { email },
		errClass: new UnauthenticatedError(errorMessage),
	});

	await checkPassword(user, password, new UnauthenticatedError(errorMessage));
	if (!user.verifiedAt) throw new UnauthenticatedError("Please check your email to verify the account");

	const existingRefreshToken = await Token.findOne({ user: user._id });
	let refreshToken;

	if (existingRefreshToken) {
		refreshToken = existingRefreshToken.refreshToken;
	} else {
		refreshToken = crypto.randomBytes(50).toString("hex");
		const tokenData = { refreshToken, ip: req.ip, userAgent: req.get("user-agent"), user: user._id };
		await modelAction({
			model: Token,
			action: "create",
			data: tokenData,
		});
	}

	return { data: user, refreshToken };
};

const logout = async (req) => {
	const user = await User.findOne({ _id: req.user.id });
	await Token.deleteMany({ user: user._id });
};

export default { register, login, logout, verify };
