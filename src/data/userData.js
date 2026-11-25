const prisma = require("../prismaClient");

const findByEmail = (email) => prisma.user.findUnique({ where: { email } });

const create = (data) =>
  prisma.user.create({
    data,
    select: { id: true, email: true },
  });

module.exports = { findByEmail, create };