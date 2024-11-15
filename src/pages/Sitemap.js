// src/components/Sitemap.jsx

import React from "react";
import { Link } from "react-router-dom";

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Sitemap</h1>
        
        {/* Main Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Main Sections</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:underline">About Us</Link>
            </li>
            <li>
              <Link to="/faq" className="text-blue-600 hover:underline">FAQ</Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Categories</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/category/electronics" className="text-blue-600 hover:underline">Electronics</Link>
            </li>
            <li>
              <Link to="/category/clothing" className="text-blue-600 hover:underline">Clothing</Link>
            </li>
            <li>
              <Link to="/category/books" className="text-blue-600 hover:underline">Books</Link>
            </li>
            <li>
              <Link to="/category/furniture" className="text-blue-600 hover:underline">Furniture</Link>
            </li>
          </ul>
        </div>

        {/* User Account Links */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Account</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="text-blue-600 hover:underline">Profile</Link>
            </li>
            <li>
              <Link to="/my-listings" className="text-blue-600 hover:underline">My Listings</Link>
            </li>
            <li>
              <Link to="/favorites" className="text-blue-600 hover:underline">Favorites</Link>
            </li>
          </ul>
        </div>

        {/* Footer Links */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Footer Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/help" className="text-blue-600 hover:underline">Help Center</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
