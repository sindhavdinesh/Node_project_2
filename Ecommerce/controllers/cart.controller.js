const Cart = require("../models/cart.model");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user._id; // Yeh verifyToken middleware se aayega

        // Check karein ki kya yeh product pehle se cart mein hai?
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            cartItem = await Cart.create({ userId, productId, quantity });
        }

        res.status(200).json({ message: "Product added to cart", cartItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCart = async (req, res) => {
    try {
        // .populate se product ki details (name, price) bhi mil jayengi
        const cartItems = await Cart.find({ userId: req.user._id }).populate("productId");
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};