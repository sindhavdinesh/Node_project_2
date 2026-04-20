const mongoose = require('mongoose');

const subCategory = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategoryName: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const SubCategory = mongoose.model("SubCategory", subCategory);

module.exports = SubCategory;