const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().max(100).required(),
  password: Joi.string().min(8).max(72).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };