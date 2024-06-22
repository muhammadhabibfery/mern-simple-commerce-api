import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";

class BadRequestError extends CustomError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.BAD_REQUEST;
	}
}

export default BadRequestError;
