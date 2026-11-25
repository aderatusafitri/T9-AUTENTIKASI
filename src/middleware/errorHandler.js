const kirim = (res, status, pesan, kode) =>
  res.status(status).json({ error: { pesan, kode } });

const errorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return kirim(res, err.statusCode, err.message, err.kode);
  }

  if (err.type === "entity.parse.failed") {
    return kirim(res, 400, "Format JSON tidak valid", "JSON_TIDAK_VALID");
  }

  if (err.code === "P2002") {
    return kirim(res, 409, "Data dengan nilai unik tersebut sudah ada", "DATA_DUPLIKAT");
  }

  if (err.code === "P2003") {
    return kirim(
      res,
      409,
      "Data masih dipakai oleh data lain dan tidak bisa dihapus",
      "DATA_MASIH_DIPAKAI"
    );
  }

  console.error(err);
  kirim(res, 500, "Terjadi kesalahan pada server", "SERVER_ERROR");
};

module.exports = errorHandler;