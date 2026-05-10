import { useEffect, useState } from "react";
import { orderApi } from "../../services/api";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    orderApi
      .listAll()
      .then((data) => setOrders(data.orders || []))
      .catch((err) => setError(err.message));
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      const data = await orderApi.update(id, { status });
      setOrders((current) =>
        current.map((order) => (order._id === id ? data.order : order))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h2 className="mb-6 text-2xl font-bold">Order Management</h2>
      {error && <p className="mb-4 text-red-600">{error}</p>}

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-left text-gray-500">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{order._id}</td>
                <td className="px-4 py-3">{order.user?.name || "Deleted user"}</td>
                <td className="px-4 py-3">Rs. {order.totalPrice.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(order._id, event.target.value)
                    }
                    className="rounded border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(order._id, "Delivered")}
                    className="rounded bg-green-500 px-3 py-1 text-white transition hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
