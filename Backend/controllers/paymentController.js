const crypto = require("crypto");
const Razorpay = require("razorpay");
const Order = require("../models/Order");

const getRazorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

const createPaymentOrder = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, user: req.user._id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(200).json({
        success: true,
        demo: true,
        key: "rzp_test_demo",
        paymentOrder: {
          id: `demo_${order._id}`,
          amount: Math.round(order.totalPrice * 100),
          currency: "INR",
        },
      });
    }

    const paymentOrder = await razorpay.orders.create({
      amount: Math.round(order.totalPrice * 100),
      currency: "INR",
      receipt: String(order._id),
    });

    return res.status(201).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      paymentOrder,
    });
  } catch (error) {
    return next(error);
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const {
      orderId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      demo,
    } = req.body;

    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    let verified = Boolean(demo);

    if (!verified) {
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      verified = expectedSignature === razorpay_signature;
    }

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    order.isPaid = true;
    order.paidAt = new Date();
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = { createPaymentOrder, verifyPayment };
