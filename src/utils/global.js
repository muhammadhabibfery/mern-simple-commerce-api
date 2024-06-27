import path from "path";
import { fileURLToPath } from "url";
import { operatorFilterProperties } from "../config/global.js";
import { clearCookie, setCookie } from "../config/cookie.js";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import CustomError from "../errors/customError.js";
import { StatusCodes } from "http-status-codes";

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
	set ? res.cookie("refreshToken", user.createToken(), setCookie) : res.cookie("refreshToken", "", clearCookie);
};

export const convertOperatorFilters = (keyword, propertyList, regEx) => {
	const result = {};

	keyword = keyword
		.replace(regEx, (match) => `*${operatorFilterProperties[match]}*`)
		.split(",")
		.forEach((item) => {
			const [property, operator, value] = item.split("*");

			if (propertyList.includes(property)) result[property] = { [operator]: Number(value) };
		});

	return Object.keys(result).length > 0 ? result : undefined;
};

export const setParams = (action, model, objectParams, errClass, { body = null, additonalData = null } = {}) => {
	return { action, model, objectParams, body, errClass, additonalData };
};
export const checkItem = async ({ action, model, objectParams, body, errClass }) => {
	const item =
		action === "get"
			? await model.findOne(objectParams)
			: action === "update"
			? await model.findOneAndUpdate(objectParams, body, {
					new: true,
					runValidators: true,
					context: "query",
			  })
			: await model.findOneAndDelete(objectParams);

	if (!isExistsObjectParams(objectParams) || !item) throw errClass;

	return item;
};
const isExistsObjectParams = (queries) => {
	let isExists = true;

	for (let key in queries) {
		if (queries[key] === null || queries[key] === undefined) isExists = false;
	}

	return isExists;
};

export const modelAction = async ({ model, action, queries, errClass, data, additonalData }) => {
	let result;
	const options = { additonalData };

	switch (action) {
		case "get":
			result = await model.findOne(queries, options);
			break;
		case "create":
			result = await model.create(data);
			break;
		case "update":
			result = await model.findOneAndUpdate(queries, data, { ...options, new: true, runValidators: true, context: "query" });
			break;
		case "delete":
			result = await model.findOneAndDelete(queries, options);
			break;
		default:
			throw new CustomError("Action for model not available", StatusCodes.INTERNAL_SERVER_ERROR);
	}

	if (action !== "create") {
		if (!isExistsQueries(queries) || !result) throw errClass;
	}

	return result;
};

const isExistsQueries = (queries) => {
	let isExists = true;

	for (let key in queries) {
		if (queries[key] === null || queries[key] === undefined) isExists = false;
	}

	return isExists;
};

export const dirName = (filePath) => {
	const __filename = fileURLToPath(filePath);
	return path.dirname(__filename);
};

export const convertToSlug = (value) => {
	return value.toLowerCase().replaceAll(" ", "-");
};

export const checkPassword = async (user, password, errClass) => {
	const isCorrectPassword = await user.checkPassword(password);
	if (!isCorrectPassword) throw errClass;
};

export const checkPermission = (currentUser, resourceUserId, canAdminAccessThis = false) => {
	if (canAdminAccessThis) {
		if (currentUser.role === "admin") return;
	}

	if (currentUser.id === resourceUserId.toString()) return;

	throw new UnauthorizedError("Unauthorized");
};
