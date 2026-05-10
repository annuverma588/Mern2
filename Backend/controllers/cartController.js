const mongoose = require("mongoose");
const Cart = require("../models/Carts");
const Product = require("../models/product");

const getCartQuery = (req) => {
  if (req.user) return { user: req.user._id };
  if (req.body.guestId || req.query.guestId) {
    return { guestId: req.body.guestId || req.query.guestId };
  }
  return null;
};

const calculateTotal = (products) =>
  products.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 1), 0);

const getCart = async (req, res, next) => {
  try {
    const query = getCartQuery(req);
    if (!query) {
      return res.status(400).json({ success: false, message: "guestId is required" });
    }

    const cart = await Cart.findOne(query).populate("products.product");
    return res.status(200).json({ success: true, cart: cart || { products: [], totalPrice: 0 } });
  } catch (error) {
    return next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size, color, guestId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: "Invalid product id" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const query = req.user ? { user: req.user._id } : { guestId };
    if (!req.user && !guestId) {
      return res.status(400).json({ success: false, message: "guestId is required" });
    }

    let cart = await Cart.findOne(query);
    if (!cart) {
      cart = await Cart.create({ ...query, products: [], totalPrice: 0 });
    }

    const existingItem = cart.products.find(
      (item) =>
        String(item.product) === String(product._id) &&
        item.size === size &&
        item.color === color
    );

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.products.push({
        product: product._id,
        name: product.name,
        image: product.images?.[0]?.url,
        price: product.discountPrice || product.price,
        size,
        color,
        quantity: Number(quantity),
      });
    }

    cart.totalPrice = calculateTotal(cart.products);
    const updatedCart = await cart.save();

    return res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    return next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const query = getCartQuery(req);

    if (!query) {
      return res.status(400).json({ success: false, message: "guestId is required" });
    }

    const cart = await Cart.findOne(query);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.products.find(
      (cartItem) =>
        String(cartItem.product) === String(productId) &&
        cartItem.size === size &&
        cartItem.color === color
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    item.quantity = Math.max(Number(quantity), 1);
    cart.totalPrice = calculateTotal(cart.products);
    const updatedCart = await cart.save();

    return res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    return next(error);
  }
};

const removeCartItem = async (req, res, next) => {
  try {
    const { productId, size, color } = req.body;
    const query = getCartQuery(req);

    if (!query) {
      return res.status(400).json({ success: false, message: "guestId is required" });
    }

    const cart = await Cart.findOne(query);
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) =>
        !(
          String(item.product) === String(productId) &&
          item.size === size &&
          item.color === color
        )
    );
    cart.totalPrice = calculateTotal(cart.products);
    const updatedCart = await cart.save();

    return res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
