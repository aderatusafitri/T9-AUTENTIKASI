const express = require("express");
const productController = require("../controllers/productController");
const validate = require("../middleware/validate");
const { butuhLogin } = require("../middleware/auth");
const { productSchema } = require("../validators/productValidator");

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);

router.post("/", butuhLogin, validate(productSchema), productController.create);
router.put("/:id", butuhLogin, validate(productSchema), productController.update);
router.delete("/:id", butuhLogin, productController.remove);

module.exports = router;