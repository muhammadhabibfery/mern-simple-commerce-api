import "dotenv/config";
import Db from "../../config/database.js";
import adminSeeder from "./adminSeeder.js";

const seedingData = async () => {
	try {
		await Db.connect(process.env.MONGO_URI);

		await adminSeeder();

		await Db.disconnect();
		process.exit(0);
	} catch (error) {
		console.log("error seeding data", error);
		process.exit(1);
	}
};

seedingData();
