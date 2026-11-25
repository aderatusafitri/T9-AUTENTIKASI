const AppError = require("../utils/AppError");

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const pesan = error.details.map((d) => d.message).join("; ");
    return next(new AppError(422, pesan));
  }

  req.body = value;
  next();
};

module.exports = validate;