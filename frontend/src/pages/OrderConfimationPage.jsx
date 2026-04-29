const checkout = {
  _id: "64a9c8e5b1d2c8f1a2b3c4d",
  createdAt: "2026-04-20T10:00:00Z",
  items: [
    {
      productId: "1",
      name: "Skirt",
      color: "Black",
      size: "M",
      price: 500,
      quantity: 1,
      image:
        "https://www.veromoda.in/cdn/shop/files/901366101_g0.jpg?v=1745716269",
    },
    {
      productId: "2",
      name: "Shirt",
      color: "Red",
      size: "M",
      price: 299,
      quantity: 2,
      image:
        "https://sassafras.in/cdn/shop/products/SFSHRT20285-1_1800x.jpg?v=1757497523",
    },
  ],
  shippingAddress: {
    address: "123 fashion street",
    city: "New York",
    country: "USA",
    postalcode: "10001",
  },
};

const OrderConfimationPage = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate;
  };

  const isDelivered = (createdAt) => {
    const deliveryDate = calculateEstimatedDelivery(createdAt);
    return new Date() >= deliveryDate;
  };

  const totalPrice = checkout.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const deliveryDate = calculateEstimatedDelivery(checkout.createdAt);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        🎉Thank You for Your Order !
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        {/* Top Section */}
        <div className="flex justify-between items-start border-b pb-4">
          <div>
            <h2 className="text-xl font-semibold">
              Order ID: {checkout._id}
            </h2>
            <p className="text-gray-500">
              Order Date:{" "}
              {new Date(checkout.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Right Side */}
          <div className="text-right">
            <p className="text-sm text-gray-500">
              Estimated Delivery
            </p>
            <p className="font-semibold text-emerald-600">
              {deliveryDate.toLocaleDateString()}
            </p>

            <p
              className={`mt-2 text-sm font-semibold ${
                isDelivered(checkout.createdAt)
                  ? "text-green-600"
                  : "text-yellow-600"
              }`}
            >
              {isDelivered(checkout.createdAt)
                ? "✅ Delivered"
                : "🚚 In Transit"}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-6 space-y-4">
          {checkout.items.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border p-4 rounded-lg hover:shadow-sm transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Color: {item.color} | Size: {item.size}
                </p>
                <p className="text-sm">
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <div className="font-semibold text-emerald-700">
                ${item.price * item.quantity}
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-6 flex justify-end">
          <h3 className="text-xl font-bold">
            Total: ${totalPrice}
          </h3>
        </div>

        {/* Address */}
        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">
            {checkout.shippingAddress.address},{" "}
            {checkout.shippingAddress.city},{" "}
            {checkout.shippingAddress.country} -{" "}
            {checkout.shippingAddress.postalcode}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfimationPage;