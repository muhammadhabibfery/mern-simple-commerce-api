import "dotenv/config";
import database from "../../config/database.js";
import adminSeeder from "./adminSeeder.js";

const seedingData = async () => {
	try {
		await database.connect(process.env.MONGO_URI);

		await adminSeeder();

		await database.disconnect();
		process.exit(0);
	} catch (error) {
		console.log("error seeding data", error);
		process.exit(1);
	}
};

seedingData();
