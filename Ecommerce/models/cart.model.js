const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items:[
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Cart", cartSchema)