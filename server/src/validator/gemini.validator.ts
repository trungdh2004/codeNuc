import Joi from "joi";
import { pagingBaseValidator } from "./system.validator";

export const geminiValidator = Joi.object({
  message: Joi.string().required().messages({}),
  language: Joi.string().required().messages({}),
});

export const messagePagingValidator = Joi.object({
  ...pagingBaseValidator,
  roomId: Joi.string().required(),
});
