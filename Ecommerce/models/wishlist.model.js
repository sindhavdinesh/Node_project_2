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
            }
        }
    ],
    isDelete: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("wishlist", cartSchema)