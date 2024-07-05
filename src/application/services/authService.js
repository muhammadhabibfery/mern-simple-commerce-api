import crypto from "crypto";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import { checkPassword, modelAction } from "../../utils/global.js";
import User from "../models/userModel.js";
import { loginValidation, registerValidation, verificationValidation } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import Email from "../emails/index.js";

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

const login = async (body) => {
	const errorMessage = "Invalid credential";
	const { email, password } = await validate(loginValidation, body);

	const user = await modelAction({
		model: User,
		action: "get",
		queries: { email },
		errClass: new UnauthenticatedError(errorMessage),
	});

	await checkPassword(user, password, new UnauthenticatedError(errorMessage));
	return { data: user, user };
};

const logout = async (userId) => {
	return User.findOne({ _id: userId });
};

export default { register, login, logout, verify };
