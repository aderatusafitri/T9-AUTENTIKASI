const productData = require("../data/productData");
const AppError = require("../utils/AppError");

const getAll = async ({ halaman, ukuran, category }) => {
  const where = category ? { category } : {};
  const skip = (halaman - 1) * ukuran;

  const [items, total] = await Promise.all([
    productData.findMany({ where, skip, take: ukuran }),
    productData.count(where),
  ]);

  return {
    data: items,
    meta: {
      halaman,
      ukuran,
      totalData: total,
      totalHalaman: Math.ceil(total / ukuran),
    },
  };
};

const getById = async (id) => {
  const product = await productData.findById(id);
  if (!product) {
    throw new AppError(404, "Produk tidak ditemukan");
  }
  return product;
};

const create = async (data) => {
  const existing = await productData.findBySku(data.sku);
  if (existing) {
    throw new AppError(409, `SKU ${data.sku} sudah digunakan`);
  }
  return productData.create(data);
};

const update = async (id, data) => {
  const product = await productData.findById(id);
  if (!product) {
    throw new AppError(404, "Produk tidak ditemukan");
  }

  if (data.sku !== product.sku) {
    const skuOwner = await productData.findBySuku(data.suku);
    if (skuOwner) {
      throw new AppError(409, 'SKU ${data.sku} sudah digunakan produk lain');
    }
  }

  return productData.update(id, data);
}

const remove = async (id) => {
  const product = await productData.findById(id);
  if (!product) {
    throw new AppError(404, "Produk tidak ditemukan");
  }
  await productData.remove(id);
};

module.exports = { getAll, getById, create, update, remove };