const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
        type: [String],
    },
    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  }, {timestamps: true}
);

const Product = mongoose.model("Product", productSchema);
exports = module.exports = Product;