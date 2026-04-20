const express = require('express');
const router = express.Router();
const { addCategory, getAllCategory, updatedCategory, deleteCategory } = require('../controllers/category.controller');
const { verifyToken } = require('../middleware/AuthToken');
const verifyRole = require('../middleware/VerifyRole')
const uploadImage = require('../middleware/uploadImage');


router.post("/add-category", verifyToken, verifyRole('admin'), uploadImage.single('image'), addCategory);
router.get("/all-categories", getAllCategory);
router.put("/update/:id", verifyToken, verifyRole('admin'), uploadImage.single('image'), updatedCategory);
router.delete("/delete/:id", verifyToken, verifyRole('admin'), deleteCategory);

module.exports = router;