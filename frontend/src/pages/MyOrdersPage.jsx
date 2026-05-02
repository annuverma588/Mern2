import React, { useEffect, useState } from "react";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "1234",
          createdAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            {
              name: "Product 1",
              image: "https://www.beingflawless.com/cdn/shop/files/DSC_5004.jpg?v=1693666305",
            },
          ],
          totalPrice: 100,
          isPaid: true,
        },
        {
          _id: "2345",
          createdAt: new Date(),
          shippingAddress: { city: "London", country: "UK" },
          orderItems: [
            {
              name: "Product 2",
              image: "https://img.tatacliq.com/images/i25//437Wx649H/MP000000027362786_437Wx649H_202507130032421.jpeg",
            },
          ],
          totalPrice: 200,
          isPaid: false,
        },
      ];

      setOrders(mockOrders);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">My Orders</h2>

      <div className="relative shadow-md sm:rounded-lg overflow-hidden bg-white">
        <table className="min-w-full text-left text-gray-500">
          
          {/* TABLE HEAD */}
          <thead className="bg-gray-100 uppercase text-gray-700 text-sm">
            <tr>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Shipping</th>
              <th className="py-3 px-4">Items</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>

          {/* TABLE BODY */}
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b hover:bg-gray-50"
                >
                  {/* Image */}
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>

                  {/* Order ID */}
                  <td className="py-3 px-4 font-medium text-gray-900">
                    #{order._id}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  {/* Shipping */}
                  <td className="py-3 px-4">
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.country}
                  </td>

                  {/* Items */}
                  <td className="py-3 px-4">
                    {order.orderItems.length} item(s)
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4">${order.totalPrice}</td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        order.isPaid
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-6 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;