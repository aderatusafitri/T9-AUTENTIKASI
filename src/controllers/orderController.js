const orderService = require("../services/orderService");

const getAll = async (req, res, next) => {
  try {
    const result = await orderService.getAll();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { productId, customerName, quantity } = req.body;
    const order = await orderService.create({ productId, customerName, quantity });
    res.status(201).json({ data: order });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, create };