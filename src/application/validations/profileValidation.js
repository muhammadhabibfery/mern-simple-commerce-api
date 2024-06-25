import Joi from "joi";

export const updateProfileValidation = Joi.object({
	name: Joi.string().min(3).max(75).required(),
	email: Joi.string().email().required(),
});

export const changePasswordValidation = Joi.object({
	current_password: Joi.string().required(),
	new_password: Joi.string().min(6).required(),
	confirm_password: Joi.string()
		.equal(Joi.ref("new_password"))
		.required()
		.messages({ "any.only": "{{ #label }} does not match" }),
});
