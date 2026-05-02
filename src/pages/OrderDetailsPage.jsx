import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const mockOrderDetails = {
      _id: orderId,
      createdAt: new Date(),
      isPaid: true,
      isDelivered: false,
      paymentMethod: "PayPal",
      shippingMethod: "Standard",
      shippingAddress: {
        city: "New York",
        country: "USA",
        postalcode: "10001",
      },
      orderItems: [
        {
          productId: "1",
          name: "Jacket",
          price: 120,
          quantity: 1,
          image:
            "https://www.saintg.in/cdn/shop/files/Untitled-2_0002_Untitled-23.1.jpg?v=1758114133",
        },
        {
          productId: "2",
          name: "Jeans",
          price: 90,
          quantity: 1,
          image:
            "https://assets.ajio.com/medias/sys_master/root/20241005/SIJz/67016c38260f9c41e858b89c/-473Wx593H-700429007-grey-MODEL.jpg",
        },
      ],
    };

    setOrderDetails(mockOrderDetails);
  }, [orderId]);

  if (!orderDetails) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>

      <div className="p-6 rounded-lg border bg-white">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              Order ID: #{orderDetails._id}
            </h3>
            <p className="text-gray-500">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ✅ Status Badges (Right Side) */}
          <div className="mt-4 sm:mt-0 flex flex-col items-end gap-2">
            {/* Payment */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {orderDetails.isPaid ? "Approved" : "Pending"}
            </span>

            {/* Delivery */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                orderDetails.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>
              Address:{" "}
              {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
            </p>
          </div>
        </div>

        {/* Order Items */}
        {/* <div>
          <h4 className="text-lg font-semibold mb-4">Order Items</h4>

          {orderDetails.orderItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h5 className="font-semibold">{item.name}</h5>
                <p className="text-gray-500">
                  Qty: {item.quantity} × ${item.price}
                </p>
              </div>

              <div className="font-semibold">
                ${item.quantity * item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="text-right mt-6 text-lg font-bold">
          Total: $
          {orderDetails.orderItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          )}
        </div>
      </div>
    </div> 
  );
};

export default OrderDetailsPage;