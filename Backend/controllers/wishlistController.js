const Wishlist = require("../models/Wishlist");

const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
    return res.status(200).json({
      success: true,
      products: wishlist?.products || [],
    });
  } catch (error) {
    return next(error);
  }
};

const toggleWishlistItem = async (req, res, next) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    const exists = wishlist.products.some(
      (product) => String(product) === String(productId)
    );

    wishlist.products = exists
      ? wishlist.products.filter((product) => String(product) !== String(productId))
      : [...wishlist.products, productId];

    await wishlist.save();
    const populatedWishlist = await wishlist.populate("products");

    return res.status(200).json({
      success: true,
      message: exists ? "Removed from wishlist" : "Added to wishlist",
      products: populatedWishlist.products,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { getWishlist, toggleWishlistItem };
