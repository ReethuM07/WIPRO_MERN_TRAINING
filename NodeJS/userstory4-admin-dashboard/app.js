const express = require("express");
const app = express();
const products = require("./data/products");
const logger = require("./middleware/logger");

// Set EJS as template engine
app.set("view engine", "ejs");

// Middleware
app.use(logger);

// Route: Admin Dashboard
app.get("/admin", (req, res) => {
  res.render("dashboard", { products });
});

// Error handling middleware (404)
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// Error handling middleware (final)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`
    <h2>Error ${err.status || 500}</h2>
    <p>${err.message}</p>
  `);
});

// Start server
app.listen(4000, () => {
  console.log("Admin dashboard running on http://localhost:4000/admin");
});
