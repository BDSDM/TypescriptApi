"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_1 = __importDefault(require("../models/Author"));
const createAuthor = (req, res, next) => {
    const author = req.body;
    const authorr = new Author_1.default(author);
    return authorr
        .save()
        .then((authorr) => res.status(201).json({ authorr }))
        .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "Not Found" }))
        .catch((error) => res.status(500).json({ error }));
};
const readAll = (req, res, next) => {
    return Author_1.default.find()
        .then((author) => res.status(200).json({ author }))
        .catch((error) => res.status(500).json({ error }));
};
const UpdateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json({ author }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: "Not found" });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => author
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not found" }))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createAuthor,
    readAuthor,
    readAll,
    UpdateAuthor,
    deleteAuthor,
};
