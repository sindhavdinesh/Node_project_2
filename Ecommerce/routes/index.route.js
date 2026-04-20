const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/user.controller");
const validator = require("../middleware/validationUser.js")
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const UploadImage = require("../middleware/uploadImage");
const subCategoryRoute = require("./subcategory.route");
const productRoute = require("./product.route"); 
const cartRoute = require("./cart.route")
const wishlistRoute = require("./wishlist.route")

router.post("/register",validator, UploadImage.single("image"), registerUser);
router.post("/login", loginUser);

router.use("/user", userRoute);
router.use("/categories", categoryRoute);
router.use("/subcategory", subCategoryRoute);
router.use("/products", productRoute);
router.use("/cart", cartRoute)
router.use("/wishlist", wishlistRoute);
module.exports = router;

