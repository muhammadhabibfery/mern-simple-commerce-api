import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import UserService from "../services/userService.js";

const getAll = async (req, res) => {
	const users = await UserService.getAll(req);
	return wrapResponse(res, StatusCodes.OK, "", users);
};

const update = async (req, res) => {
	const user = await UserService.update(req);
	return wrapResponse(res, StatusCodes.OK, "User updated successfully", user);
};

export default { getAll, update };
