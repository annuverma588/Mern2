import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { orderApi } from "../services/api";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await orderApi.listMine();
        setOrders(data.orders || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h2>

      <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg">
        {loading ? (
          <p className="p-6">Loading orders...</p>
        ) : error ? (
          <p className="p-6 text-red-600">{error}</p>
        ) : (
          <table className="min-w-full text-left text-gray-500">
            <thead className="bg-gray-100 text-sm uppercase text-gray-700">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Shipping</th>
                <th className="px-4 py-3">Items</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img
                        src={order.orderItems[0]?.image}
                        alt={order.orderItems[0]?.name}
                        className="h-12 w-12 rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      <Link to={`/order/${order._id}`}>#{order._id}</Link>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      {order.shippingAddress.city}, {order.shippingAddress.country}
                    </td>
                    <td className="px-4 py-3">{order.orderItems.length} item(s)</td>
                    <td className="px-4 py-3">Rs. {order.totalPrice}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded px-2 py-1 text-sm font-medium ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
