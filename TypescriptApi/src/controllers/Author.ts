import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
  const author = req.body;

  const authorr = new Author(author);
  return authorr
    .save()
    .then((authorr) => res.status(201).json({ authorr }))
    .catch((error) => res.status(500).json({ error }));
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) =>
      author
        ? res.status(200).json({ author })
        : res.status(404).json({ message: "Not Found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Author.find()
    .then((author) => res.status(200).json({ author }))
    .catch((error) => res.status(500).json({ error }));
};

const UpdateAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return Author.findById(authorId)
    .then((author) => {
      if (author) {
        author.set(req.body);
        return author
          .save()
          .then((author) => res.status(201).json({ author }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        res.status(404).json({ message: "Not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;
  return Author.findByIdAndDelete(authorId)
    .then((author) =>
      author
        ? res.status(201).json({ message: "deleted" })
        : res.status(404).json({ message: "Not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createAuthor,
  readAuthor,
  readAll,
  UpdateAuthor,
  deleteAuthor,
};
