import ValidationError from "../../errors/validationError.js";

const validate = async (schema, body, file = null, async = false) => {
	let data = { ...body };

	if (file) data = { ...data, ...file };

	const result = async
		? await schema.validateAsync(data, { abortEarly: false })
		: schema.validate(data, { abortEarly: false });

	if (result?.error) {
		throw new ValidationError(result.error.message);
	} else return result?.value || result;
};

export default validate;
