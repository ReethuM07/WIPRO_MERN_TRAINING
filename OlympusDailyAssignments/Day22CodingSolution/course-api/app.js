const express = require("express");
const courseRoutes = require("./routes/courseRoutes");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api/v1/courses", courseRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});