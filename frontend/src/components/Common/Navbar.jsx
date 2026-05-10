import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiBars3BottomRight,
  HiOutlineHeart,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isAdmin } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDropdownOpen, setNavDropdownOpen] = useState(false);

  const toggleNavDropdown = () => {
    setNavDropdownOpen((open) => !open);
  };

  const toggleDrawer = () => {
    setDrawerOpen((open) => !open);
  };

  const links = [
    { label: "Men", to: "/collections/all?gender=male" },
    { label: "Women", to: "/collections/all?gender=female" },
    { label: "Top Wear", to: "/collections/all?category=Shirts" },
    { label: "Bottom Wear", to: "/collections/all?category=Pants" },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-medium">
          Rabbit
        </Link>

        <div className="hidden space-x-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-sm font-medium uppercase text-gray-700 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin && (
            <Link
              to="/admin"
              className="rounded-lg border border-black px-4 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>

          <Link to="/wishlist" className="hover:text-black">
            <HiOutlineHeart className="h-6 w-6 text-gray-700" />
          </Link>

          <button type="button" onClick={toggleDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
          </button>

          <div className="overflow-hidden">
            <SearchBar />
          </div>

          <button type="button" onClick={toggleNavDropdown} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleDrawer} />

      <div
        className={`fixed left-0 top-0 h-full w-3/4 transform bg-white shadow-lg transition-transform duration-300 sm:w-1/3 ${
          navDropdownOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button type="button" onClick={toggleNavDropdown}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold">Menu</h2>
          <nav className="space-y-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={toggleNavDropdown}
                className="block text-gray-600 hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
