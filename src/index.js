import "dotenv/config";
import "express-async-errors";
import database from "./config/database.js";
import app from "./application/app.js";

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await database.connect(process.env.MONGO_URI);
		app.listen(port, () => console.log(`App running on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};
start();
