// const express =require("express");

// require("dotenv").config(); // Load environment variables from .env file

// const userRoutes = require("./routes/userRoutes"); // Import user routes
// const adminRoutes = require("./routes/adminRoutes");
// const app = express();
// app.use(express.json()); // Middleware to parse JSON request bodies
// app.use("/api/user", userRoutes); // Use the user routes for any requests to "/api/user" endpoint
// app.use("/api/admin", adminRoutes);


// app.use((error,req,res,next) => {
//     console.error(error);
//     res.status(500).json({error: "Internal Server Error"});
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });



const express = require("express");
require("dotenv").config();

const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());

app.use("/api", employeeRoutes);

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
