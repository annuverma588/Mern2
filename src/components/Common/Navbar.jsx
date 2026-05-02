import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    HiOutlineUser , 
    HiOutlineShoppingBag, 
    HiBars3BottomRight,
} from "react-icons/hi2";
import { IoMdClose } from "react-icons/io"; // ✅ FIX
import SearchBar from './SearchBar';
import CartDrawer from '../Layout/CartDrawer';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [navDropdownOpen, setNavDropdownOpen] = useState(false);

    const toggleNavDropdown = () => {
        setNavDropdownOpen(!navDropdownOpen);
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        
        <div>
          <Link to="/" className="text-2xl font-medium"> {/* ✅ FIX */}
            Rabbit
          </Link>
        </div>

        <div className='hidden md:flex space-x-6'>
          <Link to="/collections/all" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Men</Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Women</Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Top Wear</Link>
          <Link to="#" className="text-gray-700 hover:text-black text-sm font-medium uppercase">Bottom Wear</Link>
        </div>

        <div className='flex items-center space-x-4'>
          <Link
           to="/admin" 
           className='px-4 py-2 text-sm font-medium border border-black rounded-lg 
  text-black hover:bg-black hover:text-white transition-all duration-300"'
          >
            Admin</Link>
  
          <Link to="/profile" className="hover:text-black"> {/* ✅ FIX */}
            <HiOutlineUser className='h-6 w-6 text-gray-700' />
          </Link>

          <button onClick={toggleDrawer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700"/>
            
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              4
            </span>
          </button>

          <div className='overflow-hidden'>
            <SearchBar/>
          </div>

          <button onClick={toggleNavDropdown} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700"/>
          </button>
        </div>
      </nav>

      <CartDrawer 
        drawerOpen={drawerOpen} 
        toggleCartDrawer={toggleDrawer} 
      />

      {/* Mobile Dropdown */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/3 h-full bg-white shadow-lg transform
        transition-transform duration-300 ${
            navDropdownOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          <div className='flex justify-end p-4'>
            <button onClick={toggleNavDropdown}>
              <IoMdClose className='h-6 w-6 text-gray-600'/>
            </button>
          </div>
          <div className='p-4'>
            <h2 className='text-xl font-semibold mb-4'>Menu</h2>
            <nav className='space-y-4'>
              <Link 
              to="#" 
              onClick={toggleNavDropdown} 
              className='block text-gray-600 hover:text-black'
              >
                Men
              </Link>
              <Link 
              to="#" 
              onClick={toggleNavDropdown} 
              className='block text-gray-600 hover:text-black'
              >
                Women
              </Link>
              <Link 
              to="#" 
              onClick={toggleNavDropdown} 
              className='block text-gray-600 hover:text-black'
              >
                Top Wear
              </Link>
              <Link 
              to="#" 
              onClick={toggleNavDropdown} 
              className='block text-gray-600 hover:text-black'
              >
                Bottom Wear
              </Link>
            </nav>

          </div>
      </div>
    </>
  )
}

export default Navbar;