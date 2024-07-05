import Joi from "joi";
import { modelAction } from "../../utils/global.js";
import User from "../models/userModel.js";
import UnauthenticatedError from "../../errors/unauthenticatedError.js";
import ValidationError from "../../errors/validationError.js";

export const registerValidation = Joi.object({
	name: Joi.string().min(3).max(75).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
});

export const loginValidation = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const verificationValidation = Joi.object({
	verificationToken: Joi.string().required(),
	email: Joi.string()
		.email()
		.required()
		.external(async (value, helpers) => {
			const { verificationToken } = helpers.state.ancestors[0];
			const user = await modelAction({
				model: User,
				action: "get",
				queries: { email: value },
				errClass: new ValidationError(helpers.message("{{ #label }} not available")),
			});

			if (user.verificationToken !== verificationToken) throw new UnauthenticatedError("Verification failed");

			return value;
		}),
});

export const forgotPasswordValidation = Joi.object({
	email: Joi.string()
		.email()
		.required()
		.external(async (value, helpers) => {
			await modelAction({
				model: User,
				action: "get",
				queries: { email: value },
				errClass: new ValidationError(helpers.message("{{ #label }} not available")),
			});

			return value;
		}),
});
