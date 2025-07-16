const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/AuthMiddleware"); 

router.get("/", authMiddleware, cartController.getCart);
router.post("/", authMiddleware, cartController.addToCart);
router.put("/:id", authMiddleware, cartController.updateCartQuantity);
router.delete("/:id", authMiddleware, cartController.removeFromCart);

module.exports = router;