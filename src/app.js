const express = require("express");
const logger = require("./middleware/logger");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ pesan: "API Products berjalan" });
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);

module.exports = app;