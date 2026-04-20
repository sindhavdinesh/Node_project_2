const SubCategory = require("../models/subCategory.model");

exports.addSubCategory = async (req, res) => {
  try {
    let subcategory = await SubCategory.findOne({
      ...req.body,
      isDeleted: false,
    });
    if (subcategory) return res.send({ message: "Subcategory already exists" });

    subcategory = await SubCategory.create(req.body);
    res.send({ message: "Subcategory added successfully", subcategory });
  } catch (error) {
    return res.send({ message: "Error adding subcategory", error: error.message});
  }
};

exports.getAllSubCategory = async (req, res) => {
  try {
    let subcategories = await SubCategory.find({ isDeleted: false }).populate(
      "categoryId",
      "categoryName",
    );
    return res.send({
      message: "Subcategories retrieved successfully",
      subcategories,
    });
  } catch (error) {
    console.log(error);
    return res.send({ message: "Error retrieving subcategories" });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    let subcategory = await SubCategory.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      req.body,
      { new: true, runValidators: true }
    );

    if (!subcategory) {
      return res.status(404).json({message: "Subcategory not found"});
    }
    return res.status(200).json({message: "Subcategory updated successfully",subcategory});

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Error updating subcategory",error: error.message});
  }
};


exports.deleteSubCategory = async (req, res) => {
  try {
    let subcategory = await SubCategory.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!subcategory) return res.send({ message: "Subcategory not found" });
    subcategory.isDeleted = true;
    await subcategory.save();
    return res.send({ message: "Subcategory deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.send({ message: "Error deleting subcategory" });
  }
};
