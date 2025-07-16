const express = require("express");
const router = express.Router();
const { registerUser, loginUser, googleLogin, forgotPassword, resetPassword } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google", googleLogin);
router.post("/forgotpassword", forgotPassword);
router.post("/reset-password/:token", resetPassword);
module.exports = router;