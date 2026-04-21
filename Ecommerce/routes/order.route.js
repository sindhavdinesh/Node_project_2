const express = require("express");
const router = express.Router();
const { placeOrder } = require("../controllers/order.controller");
const { verifyToken } = require("../middleware/AuthToken");

router.post("/checkout", verifyToken, placeOrder);

module.exports = router;