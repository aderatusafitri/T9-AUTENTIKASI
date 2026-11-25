const express = require("express");
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const { registerSchema, loginSchema } = require("../validators/authValidator");
const { butuhLogin } = require("../middleware/auth");

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/saya", butuhLogin, authController.saya);

module.exports = router;