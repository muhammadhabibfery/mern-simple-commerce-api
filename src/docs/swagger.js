import swaggerUi from "swagger-ui-express";
import { baseRoute } from "../config/global.js";
import apiDocs from "./api-docs.json" with { type: "json" };

export default (app) => {
	app.use(`${baseRoute}/api-docs`, swaggerUi.serve, swaggerUi.setup(apiDocs));
};
