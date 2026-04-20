const express = require('express');
const router = express.Router();
const { addSubCategory, getAllSubCategory, updateSubCategory, deleteSubCategory } = require('../controllers/subcategory.controller');
const { verifyToken } = require('../middleware/AuthToken');
const verifyRole = require('../middleware/VerifyRole');

router.get("/all-subcategories", getAllSubCategory,);
router.post("/add-subcategory", verifyToken, verifyRole('admin'),addSubCategory);
router.put("/update/:id", verifyToken, verifyRole('admin'), updateSubCategory);
router.delete("/delete/:id", verifyToken, verifyRole('admin'), deleteSubCategory);

module.exports = router;