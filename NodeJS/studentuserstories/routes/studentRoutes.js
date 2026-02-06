const express = require("express");
const router = express.Router();
const studentValidator = require("../middleware/studentValidator");

// GET /students
router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Students GET route working"
    });
});

// POST /students
router.post("/", studentValidator, (req, res) => {
    res.json({
        success: true,
        message: "Student data accepted",
        data: req.body
    });
});

// Error test route
router.get("/error", (req, res) => {
    throw new Error("Unexpected Failure");
});

module.exports = router;
