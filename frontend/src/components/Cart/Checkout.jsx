import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { orderApi, paymentApi } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const readCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    setCartItems(readCart());
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const startPayment = async (order) => {
    const paymentData = await paymentApi.createOrder(order._id);

    if (paymentData.demo) {
      await paymentApi.verify({
        orderId: order._id,
        demo: true,
        razorpay_order_id: paymentData.paymentOrder.id,
        razorpay_payment_id: `demo_pay_${Date.now()}`,
        razorpay_signature: "demo",
      });
      return true;
    }

    const scriptLoaded = await loadRazorpay();
    if (!scriptLoaded) {
      throw new Error("Unable to load Razorpay checkout");
    }

    return new Promise((resolve, reject) => {
      const checkout = new window.Razorpay({
        key: paymentData.key,
        amount: paymentData.paymentOrder.amount,
        currency: paymentData.paymentOrder.currency,
        name: "Rabbit",
        description: `Order ${order._id}`,
        order_id: paymentData.paymentOrder.id,
        handler: async (response) => {
          try {
            await paymentApi.verify({ orderId: order._id, ...response });
            resolve(true);
          } catch (err) {
            reject(err);
          }
        },
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      });

      checkout.open();
    });
  };

  const handleCreateCheckout = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await orderApi.create({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: paymentMethod === "RAZORPAY" ? "Razorpay" : "Cash on Delivery",
      });

      if (paymentMethod === "RAZORPAY") {
        await startPayment(data.order);
      }

      localStorage.removeItem("cart");
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-2">
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl uppercase">Checkout</h2>

        {error && (
          <p className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {error}
          </p>
        )}

        <form onSubmit={handleCreateCheckout}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={user?.email || ""}
              className="w-full rounded border p-2"
              disabled
            />
          </div>

          <h3 className="mb-4 text-lg">Delivery</h3>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={shippingAddress.firstName}
              onChange={handleChange}
              className="rounded border p-2"
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={shippingAddress.lastName}
              onChange={handleChange}
              className="rounded border p-2"
              required
            />
          </div>

          <input
            name="address"
            type="text"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleChange}
            className="mb-4 w-full rounded border p-2"
            required
          />

          <div className="mb-4 grid grid-cols-2 gap-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleChange}
              className="rounded border p-2"
              required
            />
            <input
              name="postalCode"
              type="text"
              placeholder="Postal Code"
              value={shippingAddress.postalCode}
              onChange={handleChange}
              className="rounded border p-2"
              required
            />
          </div>

          <input
            name="country"
            type="text"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleChange}
            className="mb-4 w-full rounded border p-2"
            required
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={handleChange}
            className="mb-4 w-full rounded border p-2"
            required
          />

          <div className="mb-4">
            <label className="mb-2 block">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                Cash on Delivery
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={(event) => setPaymentMethod(event.target.value)}
                />
                Razorpay
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || cartItems.length === 0}
            className="w-full rounded bg-black py-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {loading ? "Processing..." : paymentMethod === "RAZORPAY" ? "Pay and Place Order" : "Place Order"}
          </button>
        </form>
      </div>

      <div className="rounded-lg bg-gray-100 p-6 shadow">
        <h2 className="mb-4 text-xl">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, index) => (
            <div key={`${item.product}-${index}`} className="mb-4 flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="h-16 w-16 rounded object-cover"
              />
              <div>
                <h4>{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.size} / {item.color} x {item.quantity}
                </p>
                <p>Rs. {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        )}

        <hr className="my-4" />
        <h3 className="text-lg font-bold">Total: Rs. {totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Checkout;
