const Joi = require("joi");

const orderSchema = Joi.object({
  productId: Joi.number().integer().positive().required(),
  customerName: Joi.string().trim().max(100).required(),
  quantity: Joi.number().integer().min(1).required(),
});

module.exports = { orderSchema };