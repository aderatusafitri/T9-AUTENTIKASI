const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userData = require("../data/userData");
const AppError = require("../utils/AppError");

const register = async ({ email, password }) => {
  const existing = await userData.findByEmail(email);
  if (existing) {
    throw new AppError(409, "Email sudah terdaftar", "EMAIL_DUPLIKAT");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  return userData.create({ email, passwordHash });
};

const login = async ({ email, password }) => {
  const user = await userData.findByEmail(email);

  const cocok = user ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!cocok) {
    throw new AppError(401, "Email atau password salah", "LOGIN_GAGAL");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
  return { token };
};

module.exports = { register, login };