const express = require("express");
const morgan = require("morgan");
const requestLogger = require("./middleware/requestLogger");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middleware
app.use(requestLogger);

// third-party middleware
app.use(morgan("dev"));

// routes
app.use("/students", studentRoutes);

// 404 middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Some internal server error"
  });
});

app.listen(3000, () => {
  console.log("Server is running and started");
});
