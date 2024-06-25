import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";
import ProfileService from "../services/profileService.js";

const updateProfile = async (req, res) => {
	await ProfileService.updateProfile(req);
	return wrapResponse(res, StatusCodes.OK, "Profile updated successfully");
};

const updatePassword = async (req, res) => {
	await ProfileService.updatePassword(req);
	return wrapResponse(res, StatusCodes.OK, "Password changed successfully");
};

export default { updateProfile, updatePassword };
