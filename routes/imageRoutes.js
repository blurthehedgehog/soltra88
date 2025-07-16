const express = require("express");
const router = express.Router();
const multer = require("../middlewares/upload");
const Product = require("../models/Products");

router.post("/upload", multer.array("images", 10), async (req, res) => {
  try {
    const { title } = req.body;

    if (!req.files || req.files.length === 0 || !title) {
      return res.status(400).json({ message: "Title and images are required." });
    }

    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const newProduct = new Product({
      name: title,
      category: "default",
      stock: 0,
      price: 0,
      brand: "default",
      images: imagePaths,
      desc: "Default description",
    });

    await newProduct.save();

    res.status(201).json({ message: "Images Uploaded", product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;