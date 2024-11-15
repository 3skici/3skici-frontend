import React, { useState } from "react";
import {
  FaHeart,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaTags,
  FaExclamationCircle,
  FaCopy,
} from "react-icons/fa";

const ProductCard = ({ product }) => {
  console.log("this is product data: ", product);

  const [copySuccess, setCopySuccess] = useState(false);

  let categories = [];

  if (product.categories) {
    if (Array.isArray(product.categories)) {
      categories = product.categories;
    } else {
      categories = [product.categories];
    }
  }

  // copy code for copy the product id
  const handleCopy = () => {
    navigator.clipboard.writeText(product.customId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
  };

  // status cases
  const statusMapping = {
    available: { label: "Available", color: "bg-green-500" }, // Green for available
    sold: { label: "Sold", color: "bg-red-500" }, // Red for sold
    not_available: { label: "Not Available", color: "bg-gray-500" }, // Gray for not available
  };

  // conditions cases

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative">
      <div className="absolute top-2 right-2">
      <FaHeart 
          className={`text-red-500 cursor-pointer hover:text-red-700 transition duration-300 ${
            product.favorite ? "text-red-500" : ""
          }`}
        />
      </div>
      <div className="absolute top-2 left-2 flex items-center space-x-2">
        <div
          className={`w-3 h-3 rounded-full ${
            statusMapping[product.status]?.color || "bg-gray-500"
          }`}
        />
        <span className="text-white text-xs font-semibold">
          {statusMapping[product.status]?.label || "Unknown Status"}
        </span>
      </div>
      {/* Image */}
      <img
        src={product.image || "https://via.placeholder.com/400x200"}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="text-xl font-bold mb-2 truncate">{product.name}</h2>
        <p className="text-gray-900 text-2xl font-bold mb-4">
          <span>₺</span>
          {product.price.amount || "0.00"}
        </p>
        <p className="text-gray-700 flex-grow">{product.description}</p>

        <div className="mt-4">
          <p className="text-gray-600">Condition: {product.condition}</p>
        </div>

        {/* Location */}
        <div className="mt-4 flex items-center">
          <FaMapMarkerAlt className="text-gray-800 mr-2" />
          <p className="text-gray-600">
            {product.location.street}, {product.location.city},{" "}
            {product.location.country} {product.location.zipCode}
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <FaEnvelope className="text-gray-800 mr-2" />
            <span className="text-gray-600">{product.contactInfo.email}</span>
          </div>
          <div className="flex items-center">
            <FaPhoneAlt className="text-gray-800 mr-2" />
            <span className="text-gray-600">{product.contactInfo.phone}</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <div className="flex items-center mb-2">
            <FaTags className="text-gray-800 mr-2" />
            <span className="text-gray-800 font-semibold">Categories:</span>
          </div>
          {categories.length > 0 ? (
            <div className="flex flex-wrap">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                >
                  {category}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No categories available.</p>
          )}
        </div>

        {/* Favorite */}
        {product.favorite && (
          <div className="mt-4">
            <span className="text-red-500 font-semibold">★ Favorite</span>
          </div>
        )}
      </div>

      {/* Product ID and Report Icon */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-between">
        {/* Optimized Product ID */}
        <div className="flex items-center">
          <p className="text-xs text-gray-500">
            Product Code:{" "}
            <span className="font-semibold">{product.customId.slice(-8)}</span>
          </p>
          <button
            className="ml-2 text-gray-500 hover:text-blue-600 focus:outline-none"
            onClick={handleCopy}
            title="Copy full ID"
          >
            <FaCopy className="text-sm" />
          </button>
        </div>

        {/* Copy Confirmation */}
        {copySuccess && (
          <span className="text-xs text-green-500 ml-2">Copied!</span>
        )}
        {/* Report Icon */}
        <button
          className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
          onClick={() => alert("Report product clicked!")} // Replace with actual functionality
        >
          <FaExclamationCircle
            title="Report this product if you find any issues or inappropriate content"
            className="text-lg"
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
