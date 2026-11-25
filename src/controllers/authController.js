const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await authService.register({ email, password });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const saya = (req, res) => {
  res.status(200).json({ id: req.user.id });
};

module.exports = { register, login, saya };