import { wrapData } from "../../utils/global.js";
import User from "../models/userModel.js";

const getAll = async (req) => {
	const { search, role, page, size, skip } = req.query;
	let queryObject = {};
	const sortList = "-createdAt -_id";

	// if (search) queryObject.name = { $regex: search, $options: "i" };
	if (search)
		queryObject.$or = [
			{ name: { $regex: search, $options: "i" } },
			{ email: { $regex: search, $options: "i" } },
		];
	if (role) queryObject.role = role;

	const users = await User.find(queryObject)
		.sort(sortList)
		.skip(skip)
		.limit(size);
	const totalUsers = await User.countDocuments(queryObject);

	return wrapData(users, totalUsers, { page, size });
};

const update = async () => {
	return "Update user";
};

export default { getAll, update };
