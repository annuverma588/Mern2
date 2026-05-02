import React, { useState } from "react";

const OrderManagement = () => {

  const [orders, setOrders] = useState([
    {
      _id: "123456",
      user: {
        name: "John Doe",
      },
      totalPrice: 120,
      status: "Processing",
    },
  ]);

  // ✅ Status Change Handler
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order._id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // ✅ Mark as Delivered Button
  const markAsDelivered = (id) => {
    handleStatusChange(id, "Delivered");
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      
      <h2 className="text-2xl font-bold mb-6">
        Order Management
      </h2>

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
                
                <td className="px-4 py-3">{order.user.name}</td>
                
                <td className="px-4 py-3">
                  ${order.totalPrice.toFixed(2)}
                </td>

                {/* ✅ Status Dropdown */}
                <td className="px-4 py-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* ✅ Action Button */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => markAsDelivered(order._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
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