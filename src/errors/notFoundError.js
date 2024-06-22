import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";

class NotFoundError extends CustomError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.NOT_FOUND;
	}
}

export default NotFoundError;
