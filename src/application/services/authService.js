import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import { checkItem, checkPassword, setParams } from "../../utils/global.js";
import User from "../models/userModel.js";
import {
	loginValidation,
	registerValidation,
} from "../validations/authValidation.js";
import validate from "../validations/validate.js";

const register = async (body) => {
	const data = await validate(registerValidation, body);
	await User.create(data);
};

const login = async (body) => {
	const errorMessage = "Invalid credential";
	const { email, password } = await validate(loginValidation, body);
	const params = setParams(
		"get",
		User,
		{ email },
		new UnauthenticatedError(errorMessage)
	);

	const user = await checkItem(params);
	await checkPassword(user, password, new UnauthenticatedError(errorMessage));
	return { data: user.self(), user };
};

const logout = async (userId) => {
	return User.findOne({ _id: userId });
};

const deleteAllUsers = async () => {
	await User.deleteMany({});
};

export default { register, login, logout, deleteAllUsers };
