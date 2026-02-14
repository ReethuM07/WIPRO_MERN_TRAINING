const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const session = require("express-session");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const auth = require("./middleware/auth");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// SESSION SETUP
app.use(
  session({
    secret: "hybrid_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routes
app.use("/", authRoutes);
app.use("/products", productRoutes);

// ADMIN: JWT → SESSION CREATED HERE
app.get("/admin", auth, (req, res) => {
  // create session after JWT verification
  req.session.user = {
    id: req.user.id,
  };

  res.render("admin");
});

// mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/userstory6jwt")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
