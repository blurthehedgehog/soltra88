const express = require("express");
const router = express.Router();
const protect = require("../middlewares/AuthMiddleware");
const User = require("../models/User");

router.post("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.body._id;

    if (!productId) {
      return res.status(400).json({ message: "No product ID provided" });
    }

    const alreadyLiked = user.favorites.includes(productId);

    if (alreadyLiked) {
      user.favorites = user.favorites.filter(id => id.toString() !== productId);
    } else {
      user.favorites.push(productId);
    }

    await user.save();

    res.status(200).json({
      message: alreadyLiked ? "Removed from favorites" : "Added to favorites",
      favorites: user.favorites
    });
  } catch (err) {
    console.error("Like save error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("favorites");
    res.json(user.favorites);
  } catch (err) {
    console.error("Get likes error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;