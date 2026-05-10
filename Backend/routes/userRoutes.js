const express = require("express");
const { protect, admin } = require("../Middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserProfile,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.route("/").get(protect, admin, getUsers).post(protect, admin, createUser);
router
  .route("/:id")
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
