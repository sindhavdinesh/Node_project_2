const express = require("express");
const router = express.Router();


const userRouter = require("./user.route");
const productRoute = require("./product.route");
const categoryRoute = require("./category.route");
const cartRoute = require("./cart.route");
const wishlistRoute = require("./wishlist.route"); 
const orderRoute = require("./order.route");       


router.use("/users", userRouter);
router.use("/products", productRoute);
router.use("/categories", categoryRoute);
router.use("/cart", cartRoute);
router.use("/wishlist", wishlistRoute); 
router.use("/orders", orderRoute);      

module.exports = router;
