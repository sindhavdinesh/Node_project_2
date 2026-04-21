const express = require("express");
const router = express.Router();

// 1. Saare Imports Ek Saath (Top par)
const userRouter = require("./user.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const cartRoute = require("./cart.route");
const wishlistRoute = require("./wishlist.route"); // Wishlist import
const orderRoute = require("./order.route");       // Order import

// 2. Saare URL Mappings (Bottom par)
router.use("/users", userRouter);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/cart", cartRoute);
router.use("/wishlist", wishlistRoute); // http://localhost:4000/api/wishlist
router.use("/orders", orderRoute);      // http://localhost:4000/api/orders

module.exports = router;