import Joi from "joi"

export const descriptionSchema = Joi.object({
  description: Joi.string().max(10000).allow(""),
  media: Joi.array().items(Joi.string().uri()).max(5),
})

export const likeSchema = Joi.object({
  postId: Joi.string().length(24).required(),
})

export const likeSchema = Joi.object({
  postId: Joi.string().length(24).required(),
  text: Joi.string().min(1).max(300).required(),
})