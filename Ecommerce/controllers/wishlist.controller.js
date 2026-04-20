const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

exports.addToWishlist = async (req, res) => {
    try {
        let userId = req.user._id;

        let product = await Product.findById(req.body.productId);
        if (!product || product.isDeleted == true) {
            return res.json({ message: "Product not found" });
        }

        // Find wishlist
        let wishlist = await Wishlist.findOne({ userId });

        if (!wishlist) {
            // Create new wishlist
            wishlist = await Wishlist.create({
                userId,
                items: [
                    {
                        productId: req.body.productId
                    }
                ]
            });
        } else {
            // Check if already exists
            let item = wishlist.items.find(
                (item) => item.productId.toString() === req.body.productId
            );

            if (item) {
                return res.json({
                    message: "Product already in wishlist"
                });
            }

            // Add new product
            wishlist = await Wishlist.findOneAndUpdate(
                { userId },
                {
                    $push: {
                        items: {
                            productId: req.body.productId
                        }
                    }
                },
                { new: true }
            );
        }

        // Populate product details
        wishlist = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "name price images"
        });

        return res.json({
            message: "Product added to wishlist",
            data: wishlist
        });

    } catch (error) {
        return res.json({
            message: "Server Error",
            error: error.message
        });
    }
};

exports.getAllWishlist = async (req, res) => {
    try {
        let userId = req.user._id;

        let wishlist = await Wishlist.findOne({ userId, isDelete: false })
            .populate({
                path: "items.productId",
                select: "name price images"
            });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found"
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


exports.removeWishlist = async (req, res) => {
    try {
        let userId = req.user._id;
        let { productId } = req.body;

        let wishlist = await Wishlist.findOneAndUpdate(
            { userId, isDelete: false },
            {
                $pull: {
                    items: { productId: productId }
                }
            },
            { new: true }
        ).populate({
            path: "items.productId",
            select: "name price images"
        });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found"
            });
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
