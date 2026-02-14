// const express = require("express");
// const app = express();
// const products = require("./data/products");
// const logger = require("./middleware/logger");

// // Set EJS as template engine
// app.set("view engine", "ejs");

// // Middleware
// app.use(logger);

// // Route: Admin Dashboard
// app.get("/admin", (req, res) => {
//   res.render("dashboard", { products });
// });

// // Error handling middleware (404)
// app.use((req, res, next) => {
//   const error = new Error("Page Not Found");
//   error.status = 404;
//   next(error);
// });

// // Error handling middleware (final)
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.send(`
//     <h2>Error ${err.status || 500}</h2>
//     <p>${err.message}</p>
//   `);
// });

// // Start server
// app.listen(4000, () => {
//   console.log("Admin dashboard running on http://localhost:4000/admin");
// });



const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

const products = require("./data/products");
const logger = require("./middleware/logger");
const { auth, SECRET_KEY } = require("./middleware/auth");

app.set("view engine", "ejs");
app.use(express.json());
app.use(logger);

//LOGIN ROUTE
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // hardcoded admin
  if (username === "admin" && password === "1234") {
    const token = jwt.sign(
      { username, role: "admin" },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

// PROTECTED ADMIN ROUTE 
app.get("/admin", auth, (req, res) => {
  res.render("dashboard", { products });
});

// 404
app.use((req, res, next) => {
  const error = new Error("Page Not Found");
  error.status = 404;
  next(error);
});

// ERROR HANDLER 
app.use((err, req, res, next) => {
  res.status(err.status || 500).send(`
    <h2>Error ${err.status || 500}</h2>
    <p>${err.message}</p>
  `);
});

app.listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
