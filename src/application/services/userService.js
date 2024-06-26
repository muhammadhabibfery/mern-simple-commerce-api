import NotFoundError from "../../errors/notFoundError.js";
import { modelAction, wrapData } from "../../utils/global.js";
import User from "../models/userModel.js";
import { updateUser } from "../validations/userValidation.js";
import validate from "../validations/validate.js";

const getAll = async ({ query, user }) => {
	const { search, role, page, size, skip } = query;
	let queryObject = { _id: { $ne: user.id } };
	const sortList = "-createdAt -_id";

	if (search) queryObject.$or = [{ name: { $regex: search, $options: "i" } }, { email: { $regex: search, $options: "i" } }];
	if (role) queryObject.role = role;

	const users = await User.find(queryObject).sort(sortList).skip(skip).limit(size);
	const totalUsers = await User.countDocuments(queryObject);

	return wrapData(users, totalUsers, { page, size });
};

const update = async ({ params, body, user }) => {
	let data = await validate(updateUser, body);
	data = { ...data, updatedBy: user.id };

	await modelAction({
		model: User,
		action: "update",
		queries: { _id: params.id },
		errClass: new NotFoundError("User not found"),
		data,
	});
};

export default { getAll, update };
