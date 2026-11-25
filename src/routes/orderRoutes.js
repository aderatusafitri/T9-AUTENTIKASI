const express = require("express");
const orderController = require("../controllers/orderController");
const validate = require("../middleware/validate");
const { orderSchema } = require("../validators/orderValidator");

const router = express.Router();

router.get("/", orderController.getAll);
router.post("/", validate(orderSchema), orderController.create);

module.exports = router;