const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  sku: Joi.string().trim().max(50).required(),
  category: Joi.string().trim().max(50).required(),
  price: Joi.number().integer().min(0).required(),
  stock: Joi.number().integer().min(0).required(),
});

module.exports = { productSchema };