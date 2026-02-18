import React from 'react';
import { Link } from 'react-router-dom';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
import AboveFooter from '../Layout/AboveFooter';

const Footer = () => {
  return (
    <footer className="border-t">
      <AboveFooter />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-16 py-12">
        {/* Shop Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-bold uppercase">Shop</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="#" className="hover:text-black transition-colors">Shop by Skill</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">Shop by Age</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">Shop by Activity</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">New Arrivals</Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-bold uppercase">Support</h3>
          <ul className="space-y-3 text-gray-600">
            <li>
              <Link to="#" className="hover:text-black transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">FAQs</Link>
            </li>
            <li>
              <Link to="#" className="hover:text-black transition-colors">Shipping & Returns</Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-bold uppercase">Follow Us</h3>
          <div className="flex items-center space-x-5 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black transition-colors"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <h3 className="text-lg text-gray-800 mb-4 font-bold uppercase">Call Us</h3>
          <p className="text-gray-600">
            <FiPhoneCall className="inline-block mr-2" />
            +91 9403083784
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4 font-bold uppercase">Newsletter</h3>
          <p className="text-gray-500 text-sm mb-4">
            Be the first to hear about new products, exclusive events, and online offers.
          </p>
          <p className="text-gray-500 text-sm mb-6 font-medium">
            Sign up and get 10% off your first order.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md font-medium hover:bg-gray-800 transition-all whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-6 lg:px-16 border-t border-gray-200 pt-6">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Learning Lounge. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer