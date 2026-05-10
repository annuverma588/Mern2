const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
} = require("../controllers/orderController");
const { protect, admin } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.get("/mine", protect, getMyOrders);
router
  .route("/:id")
  .get(protect, getOrderById)
  .put(protect, admin, updateOrderStatus);

module.exports = router;
