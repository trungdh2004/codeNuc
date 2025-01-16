import Joi from "joi";

export const pagingBaseValidator = {
  pageIndex: Joi.number().required().messages({}),
  pageSize: Joi.number().required().messages({}),
  keyword: Joi.string().allow("").messages({}),
};
