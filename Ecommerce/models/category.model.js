const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: {
        type: String,
    },
    image: {
        type: String
    }, 
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory"
    },
    isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;