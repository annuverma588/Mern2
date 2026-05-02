import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";

const cart = {
  products: [
    {
      name: "Style Jacket",
      size: "M",
      color: "Black",
      price: 100,
      image: [{ url: "https://picsum.photos/500/500?random=1" }],
    },
    {
      name: "Denim Shirt",
      size: "L",
      color: "Blue",
      price: 200,
      image: [{ url: "https://picsum.photos/500/500?random=2" }],
    },
    {
      name: "Casual T-Shirt",
      size: "S",
      color: "White",
      price: 400,
      image: [{ url: "https://picsum.photos/500/500?random=3" }],
    },
    {
      name: "Hoodie Sweatshirt",
      size: "XL",
      color: "Grey",
      price: 520,
      image: [{ url: "https://picsum.photos/500/500?random=4" }],
    },
  ],
  totalPrice: 1220,
};

const Checkout = () => {
  const navigate = useNavigate();
  
  const [checkoutId, setCheckoutId] = useState(null); // simple unique ID for demo

  const [shippingAddress, setShippingAddress] = useState({
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    postalcode: "",
    country: "",
    phone: "",
  });

  // ✅ reusable change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateCheckout = (e) => {
    e.preventDefault();

    // simple validation
    if (!shippingAddress.firstname || !shippingAddress.lastname) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Order Placed", shippingAddress);
    navigate("/success");
  };
  const handelPaymentSuccess = (details) => {
    console.log("Payment Success", details);
    navigate("/order-confirmation");
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto gap-8 py-10 px-6">
      
      {/* LEFT */}
      <div className="bg-white rounded-lg p-6 shadow">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>

        <form onSubmit={handleCreateCheckout}>
          <div className="mb-4">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value="priya@gmail.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <h3 className="text-lg mb-4">Delivery</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="firstname"
              type="text"
              placeholder="First Name"
              value={shippingAddress.firstname}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />

            <input
              name="lastname"
              type="text"
              placeholder="Last Name"
              value={shippingAddress.lastname}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            />
          </div>

          <input
            name="address"
            type="text"
            placeholder="Address"
            value={shippingAddress.address}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              name="city"
              type="text"
              placeholder="City"
              value={shippingAddress.city}
              onChange={handleChange}
              className="p-2 border rounded"
            />

            <input
              name="postalcode"
              type="text"
              placeholder="Postal Code"
              value={shippingAddress.postalcode}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>

          <input
            name="country"
            type="text"
            placeholder="Country"
            value={shippingAddress.country}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
          />

          <input
            name="phone"
            type="text"
            placeholder="Phone"
            value={shippingAddress.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-4"
            required
          />
            <div className="mt-6">
              {!checkoutId ? (
                <button type="submit"
                 className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
                >Continue to payment</button>
              ):(
                <div>
                  <h3 className="text-lg mb-4 ">Pay with Paypal</h3>
                  <PayPalButton amount={100} onSucess={handelPaymentSuccess} 
                  onError={(err)=> alert("payment failed . Try again.")}/>
                </div>
                )}
            </div>
          {/* <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
          >
            Place Order
          </button> */}
        </form>
      </div>

      {/* RIGHT */}
      <div className="bg-gray-100 p-6 rounded-lg shadow">
        <h2 className="text-xl mb-4">Order Summary</h2>

        {cart.products.map((item, index) => (
          <div key={index} className="flex items-center gap-4 mb-4">
            <img
              src={item.image[0].url}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <h4>{item.name}</h4>
              <p className="text-sm text-gray-500">
                {item.size} / {item.color}
              </p>
              <p>${item.price}</p>
            </div>
          </div>
        ))}

        <hr className="my-4" />

        <h3 className="text-lg font-bold">
          Total: ${cart.totalPrice}
        </h3>
      </div>
    </div>
  );
};

export default Checkout;