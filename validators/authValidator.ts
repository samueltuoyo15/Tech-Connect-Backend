import Joi from "joi"

export const signUpSchema = Joi.object({
  fullname: Joi.string().min(10).max(30).required(),
  username: Joi.string().min(3).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(20).required(),
  gender: Joi.string().required(),
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
})