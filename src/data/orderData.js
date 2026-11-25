const prisma = require("../prismaClient");

const findAll = () =>
  prisma.order.findMany({
    include: { product: true },
    orderBy: { id: "desc" },
  });

const create = (data, client = prisma) =>
  client.order.create({
    data,
    include: { product: true },
  });

module.exports = { findAll, create };