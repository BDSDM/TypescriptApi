import express, { Router } from "express";
import { appendFile } from "fs";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
const router = express();
import authorRoutes from "./routes/Author";
import bookRoute from "./routes/Book";
const cors = require("cors");

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected");
  })
  .catch((error: any) => {
    console.log(error);
  });
router.use(express.json());
router.use(cors());

router.use("/authors", authorRoutes);
router.use("/books", bookRoute);

router.get("/ping", (req, res, next) =>
  res.status(200).json({ message: "pong" })
);
router.use((req, res, next) => {
  const error = new Error("not found");
  return res.status(404).json({ message: error.message });
});
http
  .createServer(router)
  .listen(3000, () => console.log("server au port 3000"));
