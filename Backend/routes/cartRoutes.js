const express = require("express");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");
const { optionalProtect } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").get(optionalProtect, getCart).post(optionalProtect, addToCart);
router.put("/", optionalProtect, updateCartItem);
router.delete("/", optionalProtect, removeCartItem);

module.exports = router;
