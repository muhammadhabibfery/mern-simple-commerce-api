import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import { checkPassword, modelAction } from "../../utils/global.js";
import User from "../models/userModel.js";
import { loginValidation, registerValidation } from "../validations/authValidation.js";
import validate from "../validations/validate.js";

const register = async (body) => {
	const data = await validate(registerValidation, body);
	// await User.create(data);
	await modelAction({
		model: User,
		action: "create",
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

export default { register, login, logout };
