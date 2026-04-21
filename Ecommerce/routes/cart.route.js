const express = require("express");
const router = express.Router();
const { addToCart, getCart } = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/AuthToken");

// URL: /api/cart/add
router.post("/add", verifyToken, addToCart); 

// URL: /api/cart/all
router.get("/all", verifyToken, getCart);

module.exports = router;