import path from "path";
import { fileURLToPath } from "url";
import { operatorFilterProperties } from "../config/global.js";
import { clearCookie, setCookie } from "../config/cookie.js";

export const wrapResponse = (res, code, message, records, errors) => {
	let responseData = { code, message };
	let token;
	let pages;

	if (records) {
		if (typeof records === "object" && records !== null) {
			if (Object.keys(records).length > 1) {
				if ("pages" in records) pages = records.pages;
				if ("token" in records) token = records.token;
				if ("data" in records) records = records.data;
			}
		}

		responseData = { ...responseData, records };
		if (token) responseData = { ...responseData, token };
		if (pages) responseData = { ...responseData, pages };
	}

	if (errors) responseData = { ...responseData, errors };

	return res.status(code).json(responseData);
};

export const wrapData = (data, total, keyword) => {
	return {
		data,
		pages: {
			current_page: keyword.page,
			total_page: Math.ceil(total / keyword.size),
			per_page: keyword.size,
			total_items: total,
		},
	};
};

export const attachCookies = (res, user, set = true) => {
	set
		? res.cookie("refreshToken", user.createToken(), setCookie)
		: res.cookie("refreshToken", "", clearCookie);
};

export const convertOperatorFilters = (keyword, propertyList, regEx) => {
	const result = {};

	keyword = keyword
		.replace(regEx, (match) => `*${operatorFilterProperties[match]}*`)
		.split(",")
		.forEach((item) => {
			const [property, operator, value] = item.split("*");

			if (propertyList.includes(property))
				result[property] = { [operator]: Number(value) };
		});

	return Object.keys(result).length > 0 ? result : undefined;
};

export const setParams = (
	action,
	model,
	objectParams,
	errClass,
	body = null
) => {
	return { action, model, objectParams, body, errClass };
};

export const checkItem = async ({
	action,
	model,
	objectParams,
	body,
	errClass,
}) => {
	const item =
		action === "get"
			? await model.findOne(objectParams)
			: action === "update"
			? await model.findOneAndUpdate(objectParams, body, {
					new: true,
					runValidators: true,
			  })
			: await model.findOneAndDelete(objectParams);

	if (!isExistsObjectParams(objectParams) || !item) throw errClass;

	return item;
};

const isExistsObjectParams = (objectParams) => {
	let isExists = true;

	for (let key in objectParams)
		if (objectParams[key] === null || objectParams[key] === undefined)
			isExists = false;

	return isExists;
};

export const dirName = (filePath) => {
	const __filename = fileURLToPath(filePath);
	return path.dirname(__filename);
};

export const convertToSlug = (value) => {
	return value.toLowerCase().replace(" ", "-");
};
