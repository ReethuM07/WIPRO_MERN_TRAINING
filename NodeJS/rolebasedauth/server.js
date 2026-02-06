const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.set("view engine", "ejs");

// DB connection
mongoose.connect("mongodb://localhost:27017/authdb")
  .then(() => console.log("Db connected"))
  .catch(err => console.error(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));

app.use(session({
  secret: 'sample-secretkey',
  resave: false,
  saveUninitialized: false
}));

// Create demo users
app.get("/demouser", async (req, res) => {
  await User.create({ username: "adminuser", password: "1234", role: "admin" });
  await User.create({ username: "clientuser", password: "1234", role: "user" });
  res.send("user created");
});

// Auth middleware
function isAuthenticated(req, res, next) {
  if (!req.session.user)
    return res.redirect("/login");
  next();
}

function authorize(role) {
  return (req, res, next) => {
    if (req.session.user.role !== role) {
      return res.send("Access denied");
    }
    next();
  };
}

// Routes
app.get("/login", (req, res) => res.render("login"));

app.post("/login", async (req, res) => {
  const user = await User.findOne(req.body);
  if (!user) return res.send("Invalid Credentials");

  req.session.user = user;

  if (user.role === "admin") {
    res.redirect("/admin");
  } else {
    res.redirect("/user");
  }
});

app.get("/user", isAuthenticated, (req, res) => {
  res.render("user", { user: req.session.user });
});

app.get("/admin", isAuthenticated, authorize("admin"), (req, res) => {
  res.render("admin");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
