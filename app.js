// import node packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// import middlewares
import cookieParser from "cookie-parser";
import { showError } from "./middlewares/general.middleware.js";

// import routers
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import accountRouter from "./routes/account.route.js";
import transactionRouter from "./routes/transaction.route.js";

// config & connect to db
dotenv.config();
mongoose
  .connect(process.env.MONGO_CONN_STR)
  .then((response) => console.log("DB Connected!"))
  .catch((error) => console.log(`DB Error: ${error}`));

// create server & use necessary middlewares
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ENDPOINT, credentials: true }));
app.use(express.json());
app.use(cookieParser());
// Routes
app.get("/", (req, res) => res.send("Working!")); // Default route for testing

app.use("/api/user/", userRouter);
app.use("/api/category/", categoryRouter);
app.use("/api/account/", accountRouter);
app.use("/api/transaction/", transactionRouter);

app.use(showError); // middleware

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
