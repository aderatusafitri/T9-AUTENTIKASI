class AppError extends Error {
  constructor(statusCode, message, kode = "ERROR") {
    super(message);
    this.statusCode = statusCode;
    this.kode = kode;
    this.isOperational = true;
  }
}

module.exports = AppError;