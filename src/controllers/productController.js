const productService = require("../services/productService");
const AppError = require("../utils/AppError");

const toPositiveInt = (value, fallback) => {
  const n = parseInt(value, 10);
  return n > 0 ? n : fallback;
};

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(400, "ID harus berupa bilangan bulat positif", "ID_TIDAK_VALID");
  }
  return id;
};

const getAll = async (req, res, next) => {
  try {
    const halaman = toPositiveInt(req.query.halaman, 1);
    const ukuran = toPositiveInt(req.query.ukuran, 5);
    const { category } = req.query;

    const result = await productService.getAll({ halaman, ukuran, category });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const product = await productService.getById(id);
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { name, sku, category, price, stock } = req.body;
    const product = await productService.create({ name, sku, category, price, stock });
    res.status(201).json({ data: product });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    const { name, sku, category, price, stock } = req.body;
    const product = await productService.update(id, { name, sku, category, price, stock });
    res.status(200).json({ data: product});
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = parseId(req.params.id);
    await productService.remove(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, create, update, remove };