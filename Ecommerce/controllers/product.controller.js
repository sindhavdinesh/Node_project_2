const Product = require("../models/product.model");

exports.AddProduct = async (req, res) => {
    try {
        let imagePaths = [];

        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => file.filename); 
        }

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            subcategory: req.body.subcategory,
            images: imagePaths
        });

        return res.status(201).json({
            message: "Product added successfully", data: product });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error adding product", error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        let { search, sortBy, order, page, limit } = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;
        const skip = (page - 1) * limit;

        let filter = { isDeleted: false };

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        let sortOptions = {};
        if (sortBy) {
            sortOptions[sortBy] = order === "desc" ? -1 : 1;
        } else {
            sortOptions.createdAt = -1;
        }

        const products = await Product.find(filter)
            .populate("subcategory")
            .sort(sortOptions)
            .skip(skip)
            .limit(limit);

        const total = await Product.countDocuments(filter);

        return res.status(200).json({
            message: "Products retrieved successfully",
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: products
        });

    } catch (error) {
        return res.status(500).json({
            message: "Error retrieving products",
            error: error.message
        });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findOne({ _id: req.params.id, isDeleted: false });
        if (!product) return res.status(404).json({ message: "Product not found" });    
        let images = product.images;
        if (req.files && req.files.length > 0) {
            images = req.files.map(file => `/uploads/${file.filename}`);
        }   
        product = await Product.findByIdAndUpdate(
            req.params.id,
            { ...req.body, images },    
            { new: true, runValidators: true }
        );
        res.status(200).json({ message: "Product updated successfully", data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating product", error: error.message });
    } 
}

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product || product.isDeleted) {
            return res.status(404).json({ message: "Product not found"})
        }
        product.isDeleted = true;
        await product.save();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
}