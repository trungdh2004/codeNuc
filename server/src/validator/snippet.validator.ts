import Joi from "joi";
import { pagingBaseValidator } from "./system.validator";

export const snippetValidator = Joi.object({
  title: Joi.string().required().messages({}),
  description: Joi.string().optional().allow(""),
  language: Joi.string().required().messages({}),
  code: Joi.string().required().messages({}),
});

export const snippetPagingValidator = Joi.object({
  ...pagingBaseValidator,
  language: Joi.array().items(Joi.string()),
});
