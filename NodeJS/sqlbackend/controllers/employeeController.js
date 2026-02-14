const pool = require("../db/connection");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employees");
    res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

exports.registerEmployee = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;

    // Required field validation
    if (!name || !email || !department) {
      return res.status(400).json({
        message: "Name, Email and Department are required",
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // Insert into DB
    const [result] = await pool.query(
      "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
      [name, email, department]
    );

    res.status(201).json({
      message: "Employee registered successfully",
      id: result.insertId,
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    next(error);
  }
};
