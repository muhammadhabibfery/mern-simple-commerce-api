import { StatusCodes } from "http-status-codes";
import { attachCookies, wrapResponse } from "../../utils/global.js";
import AuthService from "../services/authService.js";

const register = async (req, res) => {
	await AuthService.register(req.body);
	return wrapResponse(res, StatusCodes.CREATED, "Register successfully");
};

const login = async (req, res) => {
	const { data, user } = await AuthService.login(req.body);
	attachCookies(res, user);
	return wrapResponse(res, StatusCodes.OK, "Login successfully", data);
};

const logout = async (req, res) => {
	const user = await AuthService.logout(req.user.id);
	attachCookies(res, user, false);
	return wrapResponse(res, StatusCodes.OK, "Logout successfully");
};

export default { register, login, logout };
