import express from "express";

const router = express.Router();

let users = [];

router.post("/register", (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email required" });
  }

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});

router.get("/", (req, res) => {
  res.status(200).json(users);
});

export default router;
