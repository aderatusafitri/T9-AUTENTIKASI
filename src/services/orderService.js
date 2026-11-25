const prisma = require("../prismaClient");
const productData = require("../data/productData");
const orderData = require("../data/orderData");
const AppError = require("../utils/AppError");

const getAll = async () => {
  const orders = await orderData.findAll();
  return { data: orders };
};

const create = async ({ productId, customerName, quantity }) => {
  return prisma.$transaction(async (tx) => {
    const product = await productData.findById(productId, tx);
    if (!product) {
      throw new AppError(404, "Produk tidak ditemukan", "PRODUK_TIDAK_DITEMUKAN");
    }

    if (product.stock < quantity) {
      throw new AppError(
        409,
        `Stok tidak cukup. Tersedia ${product.stock}, diminta ${quantity}`,
        "STOK_TIDAK_CUKUP"
      );
    }

    const order = await orderData.create(
      {
        productId,
        customerName,
        quantity,
        totalPrice: product.price * quantity,
      },
      tx
    );

    await productData.decreaseStock(productId, quantity, tx);

    return order;
  });
};

module.exports = { getAll, create };