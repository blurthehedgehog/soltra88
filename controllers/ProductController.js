const Product = require("../models/Products");

const getProductWithAverageRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const ratings = product.ratings || [];
    const total = ratings.reduce((sum, rate) => sum + (rate.value || 0), 0);
    const average = ratings.length > 0 ? total / ratings.length : 0;

    res.json({
      ...product._doc,
      averageRating: Math.round(average * 10) / 10,
      ratingCount: ratings.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const addRating = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const existingRating = product.ratings.find(
      (r) => r.userId.toString() === userId
    );

    if (existingRating) {
      existingRating.value = rating;
    } else {
      product.ratings.push({ userId, value: rating });
    }

    await product.save();

    const ratings = product.ratings;
    const total = ratings.reduce((sum, rate) => sum + rate.value, 0);
    const average = total / ratings.length;

    res.json({
      message: "Rating saved",
      averageRating: Math.round(average * 10) / 10,
      ratingCount: ratings.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const categoryRegex = new RegExp(`^${product.category}$`, "i");
    const brandRegex = new RegExp(`^${product.brand}$`, "i");

    let relatedProducts = await Product.aggregate([
      {
        $match: {
          _id: { $ne: product._id },
          category: { $regex: categoryRegex },
          brand: { $regex: brandRegex },
        },
      },
      { $sample: { size: 4 } },
    ]);

    if (relatedProducts.length < 4) {
      const remaining = 4 - relatedProducts.length;
      const excludeIds = [product._id, ...relatedProducts.map((p) => p._id)];

      const filler = await Product.aggregate([
        {
          $match: {
            _id: { $nin: excludeIds },
          },
        },
        { $sample: { size: remaining } },
      ]);

      relatedProducts = [...relatedProducts, ...filler];
    }

    res.json(relatedProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const getProductsByCategory = async (req, res) => {
  const categoryName = req.params.categoryName;

  const products = await Product.find({
    $or: [
      { parentCategory: { $regex: new RegExp(categoryName, "i") } },
      { category: { $regex: new RegExp(categoryName, "i") } }
    ]
  });

  if (!products.length) {
    return res.status(404).json({ message: "No products found" });
  }

  res.json(products);
};  

const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const regex = new RegExp(query, "i");
    const products = await Product.find({ name: { $regex: regex } });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products matched your search" });
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getProductWithAverageRating,
  addRating,
  getRelatedProducts,
  getProductsByCategory,
  searchProducts,
};