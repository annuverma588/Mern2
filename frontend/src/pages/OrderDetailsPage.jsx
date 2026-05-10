import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { orderApi } from "../services/api";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await orderApi.details(id);
        setOrderDetails(data.order);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!orderDetails) return <p className="p-6">Order not found.</p>;

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <h2 className="mb-6 text-2xl font-bold md:text-3xl">Order Details</h2>

      <div className="rounded-lg border bg-white p-6">
        <div className="mb-8 flex flex-col justify-between sm:flex-row">
          <div>
            <h3 className="text-lg font-semibold md:text-xl">
              Order ID: #{orderDetails._id}
            </h3>
            <p className="text-gray-500">
              {new Date(orderDetails.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="mt-4 flex flex-col items-end gap-2 sm:mt-0">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                orderDetails.isPaid
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {orderDetails.isPaid ? "Paid" : "Payment Pending"}
            </span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                orderDetails.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {orderDetails.status}
            </span>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-lg font-semibold">Payment Info</h4>
            <p>Payment Method: {orderDetails.paymentMethod}</p>
            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
          </div>

          <div>
            <h4 className="mb-2 text-lg font-semibold">Shipping Info</h4>
            <p>Shipping Method: {orderDetails.shippingMethod}</p>
            <p>
              Address: {orderDetails.shippingAddress.address},{" "}
              {orderDetails.shippingAddress.city},{" "}
              {orderDetails.shippingAddress.country}
            </p>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold">Order Items</h4>

          {orderDetails.orderItems.map((item) => (
            <div
              key={`${item.product}-${item.size}-${item.color}`}
              className="flex items-center gap-4 border-b py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded object-cover"
              />
              <div className="flex-1">
                <h5 className="font-semibold">{item.name}</h5>
                <p className="text-gray-500">
                  Qty: {item.quantity} x Rs. {item.price}
                </p>
              </div>
              <div className="font-semibold">
                Rs. {(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right text-lg font-bold">
          Total: Rs. {orderDetails.totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
