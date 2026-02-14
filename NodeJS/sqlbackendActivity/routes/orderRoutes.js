const express = require("express");
const { placeOrder } = require("../controllers/orderController");
const { validateOrder, checkValidation } = require("../middleware/validateOrder");

const router = express.Router();

router.post("/order", validateOrder, checkValidation, placeOrder);

module.exports = router;
