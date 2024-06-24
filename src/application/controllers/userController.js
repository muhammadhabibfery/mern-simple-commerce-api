import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import UserService from "../services/userService.js";

const getAll = async (req, res) => {
	const users = await UserService.getAll(req);
	return wrapResponse(res, StatusCodes.OK, "", users);
};

const update = async (req, res) => {
	const message = await UserService.update();
	return wrapResponse(res, StatusCodes.OK, message);
};

export default { getAll, update };
