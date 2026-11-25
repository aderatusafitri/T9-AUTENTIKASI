const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: "error",
      pesan: err.message,
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      status: "error",
      pesan: "Format JSON tidak valid",
    });
  }

  if (err.code === "P2002") {
    return res.status(409).json({
      status: "error",
      pesan: "Data dengan nilai unik tersebut sudah ada",
    });
  }

    if (err.code === "P2003") {
    return res.status(409).json({
      status: "error",
      pesan: "Data masih dipakai oleh data lain dan tidak bisa dihapus",
    });
  }

  console.error(err);
  res.status(500).json({
    status: "error",
    pesan: "Terjadi kesalahan pada server",
  });
};

module.exports = errorHandler;