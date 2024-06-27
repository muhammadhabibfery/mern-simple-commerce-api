import ValidationError from "../../errors/validationError.js";

const validate = async (
	schema,
	body,
	async = false,
	{ files = null, context = null } = {}
) => {
	const schemaConfig = { abortEarly: false, allowUnknown: true, context };
	const schemaKeys = Object.keys(schema.describe().keys);
	let data = { ...body };

	if (files) data = { ...data, ...files };

	const result = async
		? await schema.validateAsync(data, schemaConfig)
		: schema.validate(data, schemaConfig);

	if (result?.error) throw new ValidationError(result.error.message);
	else return getValuesFromKeys(schemaKeys, result?.value || result);
};

const getValuesFromKeys = (keys, result) => {
	let data = {};
	keys.reduce((_, key) => {
		if (result.hasOwnProperty(key)) data[key] = result[key];
	}, []);
	return data;
};

export default validate;
