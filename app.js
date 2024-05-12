// import node packages
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// config & connect to db
dotenv.config();
mongoose
  .connect(process.env.MONGO_CONN_STR)
  .then((response) => console.log("DB Connected!"))
  .catch((error) => console.log(`DB Error: ${error}`));

// create server & use necessary middlewares
const app = express();
app.use(cors({ origin: process.env.FRONTEND_ENDPOINT }));
app.use(express.json());

// Routes
app.get("/", (req, res) => res.send("Working!")); // Default route for testing

// start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () =>
  console.log(`Server running on: http://localhost:${PORT}`)
);
