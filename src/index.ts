// import express and other dependencies
import express, { Application } from "express";
import cors from "cors";
import logger from "morgan";
import rateLimit from "express-rate-limit";
import "dotenv/config";

// import functions
import routes from "./routes";
import { appError } from "./middlewares/error";
import connectDB from "./config/db";

// connect to database
connectDB();

// initialize express
const app: Application = express();

// rate limiter
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 50, // limit each IP to 100 requests per windowMs
  legacyHeaders: false,
});

// apply to all requests
app.use(limiter);

// json parser
app.use(express.json());

// use middleware when in development
if (process.env.NODE_ENV === "development") {
  app.use(cors());
  app.use(logger("dev"));
}

// cors middleware
app.use(cors());

// routes middeware
app.use("/api/v2/", routes);

// error handler
app.use(appError);

// set port
const port: string | number = process.env.PORT || 8000;

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
