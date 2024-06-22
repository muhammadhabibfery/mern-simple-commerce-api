import { StatusCodes } from "http-status-codes";
import CustomError from "./customError.js";

class ValidationError extends CustomError {
	constructor(message) {
		super(message);
		this.code = StatusCodes.UNPROCESSABLE_ENTITY;
	}
}

export default ValidationError;
