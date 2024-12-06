import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";

const Product = ({ suggestedProducts = [] }) => {

  const product = useSelector((state) => state.products.selectedProduct);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const productId = product.customId || product._id || "N/A"; // Fallback to _id

  const handleFavoriteClick = () => setIsFavorited((prev) => !prev);

  const postedTime = format(new Date(product.createdAt));

  const currentLanguage = i18n.language;
  const chat = getPathWithLanguage(`/chat/${product.seller._id}/${product.customId}`, currentLanguage);
  // copy code for copy the product id
  const handleCopy = (product) => {
    navigator.clipboard.writeText(productId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
  };

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden m-4">
      {/* Product Image and Favorite Icon */}
      <div className="relative md:w-1/3">
        {/* cursor image */}
        <div>
          <img
            src={product?.images?.[0] || "https://via.placeholder.com/150"}
            alt={product?.name || "No product name"}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-colors ${
              isFavorited ? "text-red-500" : "text-gray-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-6 h-6 hover:text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                className={
                  isFavorited ? "fill-current text-red-500" : "fill-transparent"
                }
              />
            </svg>
          </button>
        </div>
        {/* Contact and Chat Buttons */}
        <div className="flex justify-around mt-4 md:mt-6 p-2">
          <button className="bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 mb-62">
            Report this product
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors">
            <Link to={chat}>
              Chat with seller
            </Link>
          </button>
        </div>
      </div>
      {/* Product Info */}
      <div className="md:w-1/3 w-full flex flex-col justify-between p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-gray-900 truncate mb-2">
            {product?.name || "No product name available"}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {product?.description || "No description available."}
          </p>
        </div>

        <div className="p-4 rounded-md space-y-4">
          {product && (
            <>
              <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Condition:</span>
                <span>{product.condition}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Category:</span>
                <span>
                  {product.category?.join(", ") || "No category available"}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Location:</span>
                <span>
                  {product.location?.city}, {product.location?.street},{" "}
                  {product.location?.zipCode}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Seller:</span>
                <span>
                  {product.seller?.username} ({product.seller?.email})
                </span>
              </div>

              {/* contact info */}
              <div className="flex flex-col space-y-4 pb-4 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all duration-300">
                {/* Email Section */}
                <div className="flex items-center space-x-3 text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                  <span className="font-semibold">Email:</span>
                  <a
                    href={`mailto:${product.contactInfo?.email}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
                  >
                    {product.contactInfo?.email}
                  </a>
                </div>

                {/* Phone Section */}
                <div className="flex items-center space-x-3 text-sm text-gray-700">
                  <span className="font-semibold">Phone:</span>
                  <a
                    href={`tel:${product.contactInfo?.phone}`}
                    className="text-green-600 hover:text-green-800 transition-colors duration-300"
                  >
                    {product.contactInfo?.phone}
                  </a>
                </div>
              </div>

              {/* status  */}
              <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Status:</span>
                <span>{product.status}</span>
              </div>

              <div className="flex justify-between text-sm text-gray-700 pb-3  border-gray-300 hover:bg-gray-50 transition-all">
                <span className="font-semibold">Posted At:</span>
                <span>{postedTime}</span>
              </div>

              {/* Product ID and Report Icon */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                {/* Optimized Product ID */}
                <div className="flex items-center">
                  <p className="text-xs text-gray-500">
                    Product ID:{" "}
                    <span className="font-semibold">{productId.slice(-8)}</span>
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
              </div>
            </>
          )}
        </div>

        <div className="mt-6">
          <p className="text-3xl font-bold text-gray-800 text-right">
            <span>₺</span>
            {product?.price?.amount != null
              ? product.price.amount.toFixed(2)
              : "0.00"}
          </p>
        </div>
      </div>

      {/* Suggested Products */}
      <div className="md:w-1/3 p-4 bg-gray-50 rounded-md">
        <h3 className="text-xl font-semibold mb-4">Suggested Products</h3>
        <div className="grid gap-4">
          {suggestedProducts.length > 0 ? (
            suggestedProducts.map((suggestedProduct, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={
                    suggestedProduct.imageUrl ||
                    "https://via.placeholder.com/50"
                  }
                  alt={suggestedProduct.name || "Suggested product"}
                  className="w-16 h-16 rounded-md object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium text-sm">
                    {suggestedProduct.name || "No name available"}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    <span>₺</span>

                    {suggestedProduct.price?.amount != null
                      ? suggestedProduct.price.amount.toFixed(2)
                      : "0.00"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">
              No suggested products available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  suggestedProducts: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.shape({
        amount: PropTypes.number,
      }),
    })
  ),
};

export default Product;
