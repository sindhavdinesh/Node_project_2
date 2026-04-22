const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user._id;

        // 1. User 
        const cartItems = await Cart.find({ userId }).populate("productId");

        if (cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // 2. Total Amount 
        let totalAmount = 0;
        const orderItems = cartItems.map(item => {
            totalAmount += item.productId.price * item.quantity;
            return {
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            };
        });

        // 3. Order create 
        const newOrder = await Order.create({
            userId,
            items: orderItems,
            totalAmount
        });

        // 4. Order 
        await Cart.deleteMany({ userId });

        res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
