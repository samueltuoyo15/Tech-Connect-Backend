import Joi from "joi"

export const followSchema = Joi.object({
  userId: Joi.string().length(24).required(),
})

export const searchSchema = Joi.object({
  query: Joi.string().min(1).max(40).required(),
})