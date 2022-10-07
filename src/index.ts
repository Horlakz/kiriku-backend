import "dotenv/config";
import express from "express";
import morgan from "morgan";

import { connectDb } from "./config/db";
import router from "./routes";

const app = express();
const port: number = parseInt(process.env.PORT!, 10) || 2000;

connectDb();

app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/v1", router);

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
