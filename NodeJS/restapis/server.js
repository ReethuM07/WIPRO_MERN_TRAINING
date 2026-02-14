const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

let products = [{ id: 1, name: "laptop", email: "abc@gmail.com" }];

// HEALTH API
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

// CREATE PRODUCT (with validation)
app.post(
  "/postproduct",
  body("email").isEmail(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    products.push(req.body);
    res.status(201).send("Product inserted");
  }
);

// GET PRODUCTS
app.get("/getproduct", (req, res) => {
  res.json(products);
});

// UPDATE PRODUCT
app.put("/product/:id", (req, res) => {
  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  product.name = req.body.name;
  res.send("Product updated");
});

// DELETE PRODUCT
app.delete("/product/:id", (req, res) => {
  const id = req.params.id;
  products = products.filter(p => p.id != id);
  res.send("Product deleted");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(4000, () => {
  console.log("app started");
});