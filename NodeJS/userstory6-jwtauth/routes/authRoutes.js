const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * REGISTER
 * URL: POST /register
 */
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(500).send("Registration failed");
  }
});

/**
 * LOGIN
 * URL: POST /login
 * Generates JWT (NO session here)
 */
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid password");
    }

    // 🔐 JWT GENERATED HERE
    const token = jwt.sign(
      { id: user._id },
      "jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send("Login failed");
  }
});

module.exports = router;
