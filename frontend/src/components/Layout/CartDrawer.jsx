import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CartContents from "../Cart/CartContents";

const readCart = () => JSON.parse(localStorage.getItem("cart") || "[]");

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (drawerOpen) setItems(readCart());
  }, [drawerOpen]);

  const persist = (nextItems) => {
    localStorage.setItem("cart", JSON.stringify(nextItems));
    setItems(nextItems);
  };

  const handleChangeQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const nextItems = items.map((item, itemIndex) =>
      itemIndex === index ? { ...item, quantity } : item
    );
    persist(nextItems);
  };

  const handleRemove = (index) => {
    persist(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const handleCheckout = () => {
    toggleCartDrawer();
    navigate("/checkout");
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-full w-3/4 flex-col bg-white shadow-lg transition-transform duration-300 sm:w-1/2 md:w-[30rem] ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4">
        <button type="button" onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="mb-4 text-xl font-semibold">Your Cart</h2>
        <CartContents
          items={items}
          onChangeQuantity={handleChangeQuantity}
          onRemove={handleRemove}
        />
      </div>

      <div className="sticky bottom-0 bg-white p-4">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={totalItems === 0}
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          Checkout
        </button>
        <p className="mt-2 text-center text-sm text-gray-500">
          Shipping, taxes, and discounts are calculated at checkout.
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
