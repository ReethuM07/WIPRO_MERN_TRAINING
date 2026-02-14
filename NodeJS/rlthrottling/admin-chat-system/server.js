const express = require("express");
const path = require("path");
const multer = require("multer");
const cors = require("cors");

const auth = require("./middleware/auth");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Only PNG, JPG, PDF allowed"));
  }
});

let messages = [];

app.post(
  "/admin/send",
  auth,
  rateLimiter,
  upload.single("file"),
  (req, res) => {
    const msg = {
      text: req.body.text,
      file: req.file ? req.file.filename : null,
      time: new Date()
    };

    messages.push(msg);
    res.json({ success: true, message: "Message sent" });
  }
);

app.get("/user/messages", (req, res) => {
  res.json(messages);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
