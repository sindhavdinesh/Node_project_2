const express = require('express')
const router = express.Router()
const { verifyToken } = require("../middleware/AuthToken");
const { addToCart, getAllCarts, removeCart } = require("../controllers/cart.controller")

router.post("/add-cart", verifyToken, addToCart);
router.get("/get-cart", verifyToken, getAllCarts);
router.put("/remove-cart", verifyToken, removeCart);

module.exports = router;