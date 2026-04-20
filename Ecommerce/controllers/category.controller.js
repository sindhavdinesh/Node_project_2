const Category = require('../models/category.model');
const { addSubCategory } = require('./subcategory.controller');

exports.addCategory = async (req, res) => {
    try {
        let category = await Category.findOne({ categoryName: req.body.categoryName, isDeleted: false });
        if (category) {
            return res.status(400).json({ message: "Category already exists" });
        }
        
        let imagepath = " ";
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        category = await Category.create({ categoryName: req.body.categoryName, image: imagepath });
        res.status(201).json({ message: "Category created", data: category });
    } catch (error) {
        res.status(500).json({ message: "Error adding category" });
    }
}
exports.getAllCategory = async (req, res) => {
  try {
    let categories = await Category.aggregate([
      {
        $lookup: {
          from: "subcategories",
          localField: "_id",
          foreignField: "categoryId",
          as: "subcategories"
        }
      },
      {
        $project: {
          _id: 1,
          categoryName: 1,
          image: 1,
          subcategories: {
            _id: 1,
            subcategoryName: 1,
          }
        }
      }
    ]);

    return res.json({
      message: "Fetch categories successfully",
      data: categories
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error fetching categories"
    });
  }
};


exports.updatedCategory = async (req, res) => {
    try {
        let category = await Category.findOne({ _id: req.params.id, isDeleted: false });    
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }   
        let imagepath = category.image;
        if (req.file) {
            imagepath = `/uploads/${req.file.filename}`;
        }
        category.categoryName = req.body.categoryName || category.categoryName;
        category.image = imagepath;
        await category.save();
        return res.json({ message: "Category updated", data: category });
    }   catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating category" });
    }       
}

exports.deleteCategory = async (req, res) => {  
    try {
        let category = await Category.findOne({ _id: req.params.id, isDeleted: false });
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.isDeleted = true;
        await category.save();
        return res.json({ message: "Category deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting category" });
    }
}

