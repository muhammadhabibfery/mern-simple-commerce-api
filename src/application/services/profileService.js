import NotFoundError from "../../errors/notFoundError.js";
import { checkItem, checkPassword, setParams } from "../../utils/global.js";
import User from "../models/userModel.js";
import {
	changePasswordValidation,
	updateProfileValidation,
} from "../validations/profileValidation.js";
import validate from "../validations/validate.js";
import ValidationError from "../../errors/validationError.js";

const updateProfile = async ({ body, user }) => {
	const data = await validate(updateProfileValidation, body);
	const params = setParams(
		"update",
		User,
		{ _id: user.id },
		new NotFoundError("User not found"),
		data
	);

	checkItem(params);
};

const updatePassword = async ({ body, user }) => {
	const { current_password, new_password } = await validate(
		changePasswordValidation,
		body
	);
	user = await User.findById({ _id: user.id });
	await checkPassword(
		user,
		current_password,
		new ValidationError(`"current_password" invalid`)
	);

	user.password = new_password;
	user.save();
	return "Update password";
};

export default { updateProfile, updatePassword };
