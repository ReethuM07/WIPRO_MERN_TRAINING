require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const User = require("./models/User");

const app = express();

/* ---------- Database ---------- */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ---------- Middleware ---------- */
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

/* ---------- Passport Config ---------- */
passport.use(new LocalStrategy(
  { usernameField: "email" },
  async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) return done(null, false);

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false);

    return done(null, user);
  }
));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

/* ---------- Routes ---------- */

// Register Form
app.get("/register", (req, res) => {
  res.render("register");
});

// Handle Registration
app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: "admin"   // change to user if needed
  });

  await newUser.save();
  console.log("User saved to DB");

  res.send(`Registration successful for ${req.body.name}`);
});

// Admin Route (RBAC)
function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  res.send("Access Denied");
}

app.get("/admin", isAdmin, (req, res) => {
  res.render("admin");
});

app.get("/", (req, res) => {
  res.send("Home page is working 🚀");
});

/* ---------- Server ---------- */
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});