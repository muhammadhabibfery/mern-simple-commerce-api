import ValidationError from "../../errors/validationError.js";

const schemaConfig = { abortEarly: false, allowUnknown: true };

const validate = async (schema, body, file = null, async = false) => {
	const schemaKeys = Object.keys(schema.describe().keys);
	let data = { ...body };

	if (file) data = { ...data, ...file };

	const result = async
		? await schema.validateAsync(data, schemaConfig)
		: schema.validate(data, schemaConfig);

	if (result?.error) throw new ValidationError(result.error.message);
	else return result?.value && getValuesFromKeys(schemaKeys, result.value);
};

const getValuesFromKeys = (keys, result) => {
	let data = {};
	keys.reduce((_, key) => {
		if (result.hasOwnProperty(key)) data[key] = result[key];
	}, []);
	return data;
};

export default validate;
