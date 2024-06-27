import { StatusCodes } from "http-status-codes";
import NotFoundError from "../../errors/notFoundError.js";
import { wrapResponse } from "../../utils/global.js";
import ValidationError from "../../errors/validationError.js";

const errorHandler = (err, req, res, next) => {
	let status = err?.code || StatusCodes.INTERNAL_SERVER_ERROR;
	let message = err?.message;
	let errors = undefined;

	if (err instanceof ValidationError) {
		message = "Invalid request";
		errors = filterErrorsPropertiesFromJoiValidation(err.message);
	}
	if (err?.name === "ValidationError") {
		status = StatusCodes.UNPROCESSABLE_ENTITY;
		message = err.name;
		errors = filterErrorsPropertiesFromMongooseValidation(err);
	}
	if (err instanceof NotFoundError || err?.name === "CastError") {
		status = err.path === "_id" ? StatusCodes.NOT_FOUND : status;
		if (err?.path === "_id" && err?.kind === "ObjectId") {
			message = message.match(/for model "([^"]+)"/);
			message = message ? `${message[1]} not found` : null;
		}
		if (
			err?.path !== "_id" &&
			err?.path !== "user" &&
			err?.kind === "ObjectId"
		) {
			status = StatusCodes.BAD_REQUEST;
			message = message.match(/at path "([^"]+)"/);
			message = message ? `Invalid ${message[1]} value` : null;
		}
	}

	return wrapResponse(res, status, message, null, errors);
};

const filterErrorsPropertiesFromMongooseValidation = (err) => {
	let errors = err?.errors;

	if (errors)
		for (let key in errors) {
			if (typeof errors[key] === "object")
				if ("message" in errors[key])
					errors[key] = errors[key]["message"];

			return errors;
		}
	else errors = filterErrorsPropertiesFromJoiValidation(err.message);

	return errors;
};

const filterErrorsPropertiesFromJoiValidation = (errors) => {
	errors = errors.replace(/\s*\(.*?\)\s*/g, "");
	const result = {};

	const regex = /\"(.*?)\" (.*?)(?:\.|$)/g;
	let match;
	while ((match = regex.exec(errors)) !== null) {
		const [, key, value] = match;
		const property = `${key.slice(0, 1).toUpperCase()}${key.slice(1)}`;
		result[key.toLowerCase()] = `${property.replaceAll(
			"_",
			" "
		)} ${value.trim()}`;
	}

	return result;
};

export default errorHandler;
