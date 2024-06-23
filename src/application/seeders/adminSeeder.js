import User from "../models/userModel.js";

const adminData = {
	name: "admin",
	email: "admin@gmail.com",
	password: "secret",
	role: "admin",
};

const adminSeeder = async () => {
	const firstAdmin = await User.countDocuments({ role: "admin" });
	if (firstAdmin < 1) {
		await User.create(adminData);
		console.log("Admin seeding completed");
	}
};

export default adminSeeder;
