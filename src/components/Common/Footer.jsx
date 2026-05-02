import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta, TbBrandInstagram } from "react-icons/tb";
import { RiTwitterLine } from 'react-icons/ri';
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="border-t py-12 bg-white">
      
      <div className="container mx-auto px-4 lg:px-0 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Newsletter
          </h3>

          <p className="text-gray-500 mb-4 text-sm">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>

          <p className="font-medium text-gray-600 mb-6 text-sm">
            Sign up and get 10% off your first order.
          </p>

          <form className="flex max-w-md">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md 
              focus:outline-none focus:ring-2 focus:ring-gray-500"
              required
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded-r-md text-sm
              hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Shop */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Shop
          </h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Men's Top Wear
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Women's Top Wear
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Men's Bottom Wear
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Support
          </h3>

          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Contact Us
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                About Us
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                FAQs
              </Link>
            </li>

            <li>
              <Link to="#" className='hover:text-black transition-colors'>
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className='text-lg font-semibold text-gray-800 mb-4'>
            Follow Us
          </h3>

          <div className='flex items-center space-x-4 mb-6 text-gray-600'>
            <a 
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black transition'
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>

            <a 
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black transition'
            >
              <TbBrandInstagram className="h-6 w-6" />
            </a>

            <a 
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className='hover:text-black transition'
            >
              <RiTwitterLine className="h-6 w-6" />
            </a>
          </div>

          <p className="text-gray-500 mb-2">Call Us</p>

          <p className="flex items-center gap-2 text-gray-700">
            <FiPhoneCall />
            +91 9876543210
          </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto px-4 lg:px-0 mt-12 border-t border-gray-200pt-6">
       <p className="text-center text-sm text-gray-500 tracking-tighter">
         © 2025,YourBrand. All Rights Reserved.
       </p>
      </div>

    </footer>
  );
};

export default Footer;