const express = require("express");
const productController = require("../controllers/productController");
const validate = require("../middleware/validate");
const { productSchema } = require("../validators/productValidator");

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getById);
router.post("/", validate(productSchema), productController.create);
router.put("/:id", validate(productSchema), productController.update);
router.delete("/:id", productController.remove);

module.exports = router;