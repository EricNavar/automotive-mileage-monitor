import { config } from "dotenv";
import express from "express";
import routes from "./routes";

config();
console.log(`Starting server on port ${process.env.PORT}!`);

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", routes);
app.listen(process.env.PORT);