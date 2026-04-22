const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

// 1. ADD TO WISHLIST
exports.addToWishlist = async (req, res) => {
    try {
        let userId = req.user._id;
        const { productId } = req.body;

        // Check if product exists
        let product = await Product.findById(productId);
        if (!product || product.isDeleted == true) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Find user's wishlist
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // Nayi wishlist banayein agar nahi hai toh
            wishlist = await Wishlist.create({
                userId,
                items: [{ productId }]
            });
        } else {
            // Check product
            let itemExists = wishlist.items.find(
                (item) => item.productId.toString() === productId
            );

            if (itemExists) {
                return res.status(400).json({ message: "Product already in wishlist" });
            }

            // Wishlist update 
            wishlist = await Wishlist.findOneAndUpdate(
                { userId },
                { $push: { items: { productId } } },
                { new: true }
            );
        }

        // Final Data 
        wishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "name price productImage" // model product img
        });

        return res.status(200).json({
            message: "Product added to wishlist",
            data: wishlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// 2. GET ALL WISHLIST ITEMS
exports.getAllWishlist = async (req, res) => {
    try {
        let userId = req.user._id;

        let wishlist = await Wishlist.findOne({ userId })
            .populate({
                path: "items.productId",
                select: "name price productImage"
            });

        if (!wishlist || wishlist.items.length === 0) {
            return res.status(200).json({
                message: "Wishlist is empty",
                data: []
            });
        }

        return res.status(200).json({
            message: "Wishlist fetched successfully",
            data: wishlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error fetching wishlist",
            error: error.message
        });
    }
};

// 3. REMOVE FROM WISHLIST
exports.removeWishlist = async (req, res) => {
    try {
        let userId = req.user._id;
        let { productId } = req.body;

        let wishlist = await Wishlist.findOneAndUpdate(
            { userId },
            { $pull: { items: { productId: productId } } },
            { new: true }
        ).populate({
            path: "items.productId",
            select: "name price productImage"
        });

        if (!wishlist) {
            return res.status(404).json({ message: "Wishlist not found" });
        }

        return res.status(200).json({
            message: "Product removed from wishlist",
            data: wishlist
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error removing wishlist item",
            error: error.message
        });
    }
};
