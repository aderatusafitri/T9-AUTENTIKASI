const prisma = require("../prismaClient");

const findMany = ({ where, skip, take }) =>
  prisma.product.findMany({
    where,
    skip,
    take,
    orderBy: { id: "asc" },
  });

const count = (where) => prisma.product.count({ where });

const findById = (id, client = prisma) =>
  client.product.findUnique({ where: { id } });

const findBySku = (sku) => prisma.product.findUnique({ where: { sku } });

const create = (data) => prisma.product.create({ data });

const update = (id, data) => prisma.product.update({ where: {id}, data});

const remove = (id) => prisma.product.delete({ where: { id } });

const decreaseStock = (id, quantity, client = prisma) =>
  client.product.update({
    where: { id },
    data: { stock: { decrement: quantity } },
  });

module.exports = {
  findMany,
  count,
  findById,
  findBySku,
  create,
  update,
  remove,
  decreaseStock,
};