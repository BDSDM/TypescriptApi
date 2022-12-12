"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const router = (0, express_1.default)();
const Author_1 = __importDefault(require("./routes/Author"));
const Book_1 = __importDefault(require("./routes/Book"));
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    console.log("Connected");
})
    .catch((error) => {
    console.log(error);
});
router.use(express_1.default.json());
router.use("/authors", Author_1.default);
router.use("/books", Book_1.default);
router.get("/ping", (req, res, next) => res.status(200).json({ message: "pong" }));
router.use((req, res, next) => {
    const error = new Error("not found");
    return res.status(404).json({ message: error.message });
});
http_1.default
    .createServer(router)
    .listen(3000, () => console.log("server au port 3000"));
