import Joi, { ObjectSchema } from "joi";
import { NextFunction, Response, Request } from "express";
import { IAuthor } from "../models/Author";
import { IBook } from "../models/Book";

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  author: {
    create: Joi.object<IAuthor>({
      author: Joi.string().required(),
    }),
    update: Joi.object<IAuthor>({
      author: Joi.string().required(),
    }),
  },
  book: {
    create: Joi.object<IBook>({
      author: Joi.string().required(),
      title: Joi.string().required(),
    }),
    update: Joi.object<IBook>({
      author: Joi.string().required(),
      title: Joi.string().required(),
    }),
  },
};
