const express = require("express");
const { registerController, loginController } = require("../controllers/authController");
const router = express.Router();

//user register route
router.post("/register",registerController );

//user login route
router.post("/login", loginController);

module.exports = router;
