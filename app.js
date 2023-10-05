import express from "express";
import cors from "cors";
import helmet from "helmet";
import route from "./routes/pages.route.js";

const app = express();

app.set("view engine", "ejs");

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/", route);
app.use("/page2", route);

export default app