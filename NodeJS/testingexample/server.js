require("dotenv").config();

const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use("/users", userRoutes);

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Internal server error" });
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

module.exports = app;
