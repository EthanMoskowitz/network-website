import express from "express";
import cors from "cors";
import helmet from "helmet";
import route from "./routes/pages.route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from 'path';

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve() + "/views");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", route);
app.use("/page2", route);

export default app