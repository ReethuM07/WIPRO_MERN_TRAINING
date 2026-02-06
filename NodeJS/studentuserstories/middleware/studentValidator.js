// const express = require("express");
// const app = express();

// app.use(express.json());

// function validateStudent(req, res, next) {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({
//       error: "Name and Email are required"
//     });
//   }

//   next(); 
// }

// app.post("/students", validateStudent, (req, res) => {
//   res.send("Student data is valid");
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });



module.exports = function studentValidator(req, res, next) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: "name and email are required"
    });
  }

  next();
};

// stops the request if invalid and return proper error message , else forwards valid requests
