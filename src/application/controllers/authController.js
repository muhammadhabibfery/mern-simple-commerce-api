import { StatusCodes } from "http-status-codes";
import { attachCookies, wrapResponse } from "../../utils/global.js";
import AuthService from "../services/authService.js";

const register = async (req, res) => {
	await AuthService.register(req);
	return wrapResponse(res, StatusCodes.CREATED, "Register success, please check your email to verify the account");
};

const verify = async (req, res) => {
	await AuthService.verify(req);
	return wrapResponse(res, StatusCodes.OK, "Verification account successfully");
};

const login = async (req, res) => {
	const { data, refreshToken } = await AuthService.login(req);
	attachCookies({ res, user: data.user, refreshToken });
	return wrapResponse(res, StatusCodes.OK, "Login successfully", data);
};

const logout = async (req, res) => {
	const user = await AuthService.logout(req);
	attachCookies({ res, user, set: false });
	return wrapResponse(res, StatusCodes.OK, "Logout successfully");
};

export default { register, login, logout, verify };
