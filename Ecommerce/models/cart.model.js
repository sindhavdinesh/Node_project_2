const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // User model 
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Product model 
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
