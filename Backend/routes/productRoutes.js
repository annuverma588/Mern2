const express = require("express");
const {
  createProduct,
  getProducts,
  getBestSeller,
  getNewArrivals,
  getProductById,
  getSimilarProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
} = require("../controllers/productController");
const { protect, admin } = require("../Middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.get("/best-seller", getBestSeller);
router.get("/new-arrivals", getNewArrivals);
router.get("/similar/:id", getSimilarProducts);
router.post("/:id/reviews", protect, createProductReview);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

module.exports = router;
