const express = require("express");
const router = express.Router();
const uploadImage = require("../middleware/uploadImage");
const { verifyToken } = require("../middleware/AuthToken");
const {getAllUser, updateProfile, deleteProfile, changePassword} = require("../controllers/user.controller");

router.get("/users", verifyToken,  getAllUser);
router.put("/profile", verifyToken, uploadImage.single("image"), updateProfile);
router.delete("/profile", verifyToken, deleteProfile);
router.put("/change-password", verifyToken, changePassword);

module.exports = router;