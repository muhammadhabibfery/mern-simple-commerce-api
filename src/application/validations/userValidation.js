import Joi from "joi";
import { userRoles } from "../models/userModel.js";

export const updateUser = Joi.object({
	role: Joi.string()
		.required()
		.valid(...userRoles)
		.messages({ "any.only": `"Role" not found` }),
});
