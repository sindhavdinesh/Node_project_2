const express = require('express')
const router = express.Router();
const { verifyToken } = require("../middleware/AuthToken");
const { addToWishlist, getAllWishlist, removeWishlist } = require("../controllers/wishlist.controller");

router.post('/add-wishlist',verifyToken, addToWishlist)
router.get('/get-wishlist',verifyToken, getAllWishlist)
router.put('/remove-wishlist',verifyToken, removeWishlist)

module.exports = router;