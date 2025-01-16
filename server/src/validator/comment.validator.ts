import Joi from "joi";
import { pagingBaseValidator } from "./system.validator";

export const commentValidator = Joi.object({
  content: Joi.string().required().messages({}),
  type: Joi.string().required().messages({}),
  parent: Joi.string().required().messages({}),
});

export const commentPagingValidator = Joi.object({
  ...pagingBaseValidator,
  parent: Joi.string().required(),
});
