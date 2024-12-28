import React, { useEffect, memo, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaTags,
  FaExclamationCircle,
  FaCopy,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../features/products/favoriteSlice";
import { selectCategories } from "../../features/categories/categoriesSlice";
import Report from "../report/Report";
import { useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { toast } from "react-toastify";

const ProductCard = memo(({ product }) => {
  const currentLanguage = i18n.language;
  const report = getPathWithLanguage("/report", currentLanguage);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const { favorites } = useSelector((state) => state.favorites);
  const categories = useSelector(selectCategories);
  const [isUpdating, setIsUpdating] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const navigate = useNavigate();
  const productId = product.customId || product._id || "N/A"; // Fallback to _id
  // check if product is a favorite
  const isFavorite = favorites.some((fav) => fav._id === product._id);

  // copy code for copy the product id
  const handleCopy = (product) => {
    navigator.clipboard.writeText(productId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
    toast.success("Product ID copied!"); // Show success toast for copying ID
  };

  // status cases
  const statusMapping = {
    available: { label: "Available", color: "bg-green-500" }, // Green for available
    sold: { label: "Sold", color: "bg-red-500" }, // Red for sold
    not_available: { label: "Not Available", color: "bg-gray-500" }, // Gray for not available
  };

  // favorite function
  const handleToggleFavorite = async (productId) => {
    if (!userId) {
      toast.error("You must be logged in to add to favorites."); // Show error toast if user is not logged in
      return;
    }
    setIsUpdating(true);
    try {
      if (isFavorite) {
        await dispatch(removeFavorite({ userId, productId: product._id }));
        toast.info("Product removed from favorites."); // Show info toast when removed from favorites
      } else {
        await dispatch(addFavorite({ userId, productId: product._id }));
        toast.success("Product added to favorites!"); // Show success toast when added to favorites
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // handle categories names
  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds)) return "Not categorized";
    return (
      categoryIds
        .map((id) => categories.find((category) => category._id === id)?.name)
        .filter(Boolean)
        .join(", ") || "Not categorized"
    );
  };

  // handle report button
  const handleReport = () => {
    // Handle report action here, e.g., navigate to the report page
    navigate(report);
    toast.info("Redirecting to report page..."); // Show info toast for report navigation
  };
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative">
      {/* Favorite Icon */}
      <div className="absolute top-2 right-2">
        <button
          className="focus:outline-none"
          onClick={() => handleToggleFavorite(product._id)}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <FaHeart className="text-gray-400 animate-spin" />
          ) : isFavorite ? (
            <FaHeart className="text-red-500 transition-colors duration-300 hover:text-red-700" />
          ) : (
            <FaRegHeart className="text-gray-500 transition-colors duration-300 hover:text-red-500" />
          )}
        </button>
      </div>
      {/* product status */}
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
          {product.category && product.category.length > 0 ? (
            <div className="flex flex-wrap">
              {getCategoryNames(product.category)
                .split(", ") // Split the concatenated category names into an array
                .map((categoryName, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                  >
                    {categoryName}
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
        {/* Report Icon */}
        <button
          className="flex items-center text-red-500 hover:text-red-700 focus:outline-none"
          onClick={handleReport}
        >
          <FaExclamationCircle
            title="Report this product if you find any issues or inappropriate content"
            className="text-lg"
          >
            <Report productId={product._id} product={product} />
          </FaExclamationCircle>
        </button>
      </div>
    </div>
  );
});

export default ProductCard;
