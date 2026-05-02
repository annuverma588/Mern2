import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const Success = () => {
  const navigate = useNavigate();
  const orderId = "ORD" + Math.floor(Math.random() * 1000000);

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-4">

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center"
      >
        
        {/* Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center mb-4"
        >
          <CheckCircle size={70} className="text-green-500" />
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Confirmed!
        </h1>

        <p className="text-gray-600 mb-4">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4 text-left">
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold">{orderId}</p>

          <p className="text-sm text-gray-500 mt-2">Estimated Delivery</p>
          <p className="font-semibold">3 - 5 Days</p>

          <p className="text-sm text-gray-500 mt-2">Payment Method</p>
          <p className="font-semibold">Online Payment</p>
        </div>

        {/* Buttons Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-3 mt-4"
        >
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            View My Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Success;