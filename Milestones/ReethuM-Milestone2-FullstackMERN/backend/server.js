const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  {
    id: 1,
    name: "Computer",
    price: 99000,
    category: "Electronics",
    description: "High performance Computer"
  },
  {
    id: 2,
    name: "Sofa",
    price: 25000,
    category: "Furniture",
    description: "Comfortable Sofa"
  }
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

app.post("/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
