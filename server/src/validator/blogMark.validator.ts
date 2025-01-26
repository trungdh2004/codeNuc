import Joi from "joi";

export const blogMarkValidator = Joi.object({
  title: Joi.string().required().messages({}),
  path: Joi.string().required().messages({}),
  userName: Joi.string().required().messages({}),
  id: Joi.string().required().messages({}),
  tagList:Joi.array().items(Joi.string()).optional()
});