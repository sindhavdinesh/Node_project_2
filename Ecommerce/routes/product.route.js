const express = require("express");
const router = express.Router();
const {AddProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { verifyToken } = require("../middleware/AuthToken");
const verifyRole = require('../middleware/VerifyRole')
const uploadImage = require("../middleware/uploadImage");

router.post("/add-product", verifyToken, uploadImage.array("images"), verifyRole('admin'), AddProduct);
router.get("/all-products", getAllProducts);
router.put("/update/:id", uploadImage.array("images"), verifyToken, verifyRole('admin'), updateProduct);
router.delete("/delete/:id", verifyToken, verifyRole('admin'), deleteProduct);

module.exports = router;