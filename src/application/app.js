import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import corsOption from "../config/cors.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import router from "../routes/router.js";
import { baseRoute } from "../config/global.js";
import rateLimiterOption from "../config/rateLimiter.js";

const app = express();

app.set("trust proxy", 1);
app.use(rateLimiter(rateLimiterOption));
app.use(mongoSanitize());
app.use(cors(corsOption));
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_KEY));
app.use(fileupload());
app.use(express.json());

app.use(baseRoute, router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
