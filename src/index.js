import "dotenv/config";
import "express-async-errors";
import app from "./application/app.js";
import connectDb from "./config/database.js";

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDb(process.env.MONGO_URI);
		app.listen(port, () => console.log(`App running on port ${port}`));
	} catch (error) {
		console.log(error);
	}
};
start();
