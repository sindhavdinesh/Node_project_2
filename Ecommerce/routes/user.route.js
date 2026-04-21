const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImage");
const { registerUser, loginUser, getprofile } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/AuthToken");

// Public
router.post("/register", uploadImage.single("image"), registerUser);
router.post("/login", loginUser);

// Protected
router.get("/profile", verifyToken, getprofile);

module.exports = router;