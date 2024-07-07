import { StatusCodes } from "http-status-codes";
import { wrapResponse } from "../../utils/global.js";

const notFoundHandler = (req, res) => {
	return wrapResponse(res, StatusCodes.NOT_FOUND, "Endpoint not found");
};

export default notFoundHandler;
