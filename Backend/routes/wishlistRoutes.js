const express = require("express");
const { getWishlist, toggleWishlistItem } = require("../controllers/wishlistController");
const { protect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, getWishlist).post(protect, toggleWishlistItem);

module.exports = router;
