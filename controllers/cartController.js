const User = require("../models/User");
const Product = require("../models/Products");

exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to get cart" });
  }
};

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const existingItem = user.cart.find(item =>
      item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({ product: productId, quantity: quantity || 1 });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

exports.updateCartQuantity = async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  try {
    const user = await User.findById(req.user.id);

    const item = user.cart.find(item =>
      item.product.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ error: "Product not in cart" });
    }

    item.quantity = quantity;
    await user.save();

    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to update cart quantity" });
  }
};

exports.removeFromCart = async (req, res) => {
  const productId = req.params.id;

  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item =>
      item.product.toString() !== productId
    );
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from cart" });
  }
};
