const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadImage");
const Product = require("../models/product.model"); 


router.post("/add", upload.single("productImage"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        const newProduct = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            image: req.file.filename 
        });

        await newProduct.save(); 

        res.status(201).json({
            message: "Product saved to database successfully!",
            product: newProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.get("/all", async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Delete Product using Query Params (?id=...)
router.delete("/delete", async (req, res) => {
    try {
        const id = req.query.id; // Postman mein URL ke piche ?id=... se value aayegi

        if (!id) {
            return res.status(400).json({ message: "Product ID is required in query params" });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            deletedProduct: deletedProduct
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 