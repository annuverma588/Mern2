const mongoose = require("mongoose");
const Order = require("../models/Order");
const Product = require("../models/product");

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const toCurrency = (value) => Math.round(Number(value || 0) * 100) / 100;

const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must include at least one item",
      });
    }

    const productIds = orderItems.map((item) => item.product || item.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((product) => [String(product._id), product]));

    const normalizedItems = orderItems.map((item) => {
      const productId = String(item.product || item.productId);
      const product = productMap.get(productId);

      if (!product) {
        throw new Error(`Product not found: ${productId}`);
      }

      const quantity = Number(item.quantity || 1);
      const image = product.images?.[0]?.url || item.image;

      return {
        product: product._id,
        name: product.name,
        image,
        price: product.discountPrice || product.price,
        quantity,
        size: item.size,
        color: item.color,
      };
    });

    const itemsPrice = toCurrency(
      normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    const shippingPrice = itemsPrice > 2000 ? 0 : 99;
    const taxPrice = toCurrency(itemsPrice * 0.05);
    const totalPrice = toCurrency(itemsPrice + shippingPrice + taxPrice);

    const order = await Order.create({
      user: req.user._id,
      orderItems: normalizedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    return next(error);
  }
};

const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    return next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }

    const query = { _id: req.params.id };
    if (req.user.role !== "admin") query.user = req.user._id;

    const order = await Order.findOne(query).populate("user", "name email");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    return res.status(200).json({ success: true, order });
  } catch (error) {
    return next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error) {
    return next(error);
  }
};

const updateOrderStatus = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const status = req.body.status || order.status;
    order.status = status;

    if (status === "Delivered") {
      order.isDelivered = true;
      order.deliveredAt = order.deliveredAt || new Date();
    }

    if (req.body.isPaid === true) {
      order.isPaid = true;
      order.paidAt = order.paidAt || new Date();
    }

    const updatedOrder = await order.save();
    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderStatus,
};
