const express = require("express");
const router = express.Router();

const {
  searchProducts,
  getProductWithAverageRating,
  getRelatedProducts,
  addRating,
  getProductsByCategory,
} = require("../controllers/ProductController");
const protect = require("../middlewares/AuthMiddleware");


router.get("/search", searchProducts);
router.get("/related/:id", getRelatedProducts);
router.get("/category/:categoryName", getProductsByCategory);
router.get("/:id", getProductWithAverageRating);
router.post("/rate/:productId", protect, addRating);

module.exports = router;