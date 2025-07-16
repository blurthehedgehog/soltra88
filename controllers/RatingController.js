const Product = require('../models/Products');
const Rating = require('../models/Rating');

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
   
    const product = await Product.findById(id).populate('ratings');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.rateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user._id;
    const { rating } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found.' });

    let existingRating = await Rating.findOne({ productId, userId });

    if (existingRating) {
      existingRating.value = rating;
      await existingRating.save();
    } else {
      existingRating = await Rating.create({ productId, userId, value: rating });
      product.ratings.push(existingRating._id);
      await product.save();
    }

    const allRatings = await Rating.find({ productId });
const ratingsByUser = new Map();
allRatings.forEach(r => { 
  ratingsByUser.set(String(r.userId), r.value);
});
const uniqueUsersCount = ratingsByUser.size;
const avgRating =
  Array.from(ratingsByUser.values()).reduce((acc, val) => acc + val, 0) / uniqueUsersCount;

    res.json({ message: 'Rating saved', averageRating: avgRating, userId: userId.toString(),   uniqueUsersCount,  });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};