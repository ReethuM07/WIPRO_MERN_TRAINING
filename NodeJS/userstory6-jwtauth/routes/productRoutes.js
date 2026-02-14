const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// session check middleware
function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    return res.status(401).send("Login required");
  }
  next();
}

// GET products (NO TOKEN)
router.get("/", isLoggedIn, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ADD product (NO TOKEN)
router.post("/", isLoggedIn, async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

module.exports = router;
