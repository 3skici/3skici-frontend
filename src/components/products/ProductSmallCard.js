import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { useDispatch, useSelector } from "react-redux";
import { FaTags } from "react-icons/fa";
import { setSelectedProduct } from "../../features/products/productsSlice";
import {
  addFavorite,
  removeFavorite,
} from "../../features/products/favoriteSlice";
import { selectCategories } from "../../features/categories/categoriesSlice";

const ProductSmallCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLanguage = i18n.language;
  const productDetails = getPathWithLanguage(
    `/product/${product.customId}`,
    currentLanguage
  );
  const categories = useSelector(selectCategories);

  const userId = useSelector((state) => state.auth.user?._id);
  const favorites = useSelector((state) => state.favorites.favorites);

  const isFavorited = favorites.some((fav) => fav._id === product._id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!userId) {
      return;
    }

    if (isFavorited) {
      dispatch(removeFavorite({ userId, productId: product._id }));
    } else {
      dispatch(addFavorite({ userId, productId: product._id }));
    }
  };

  const handleProductClick = () => {
    dispatch(setSelectedProduct(product));
    navigate(productDetails);
  };

  const getCategoryNames = (categoryIds) => {
    if (!Array.isArray(categoryIds)) return "Not categorized";
    return (
      categoryIds
        .map((id) => categories.find((category) => category._id === id)?.name)
        .filter(Boolean)
        .join(", ") || "Not categorized"
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden m-3 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Product Image and Favorite Icon */}
      <div className="relative cursor-pointer" onClick={handleProductClick}>
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name || "No product name"}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg transition-all duration-300 ${
            isFavorited ? "text-red-500" : "text-gray-600"
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
              className={`${
                isFavorited ? "fill-current text-red-500" : "fill-transparent"
              }`}
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate mb-2">
          {product.name || "No product name"}
        </h2>

        {/* Categories */}
        <div className="mt-3">
          <div className="flex items-center mb-2">
            <FaTags className="text-gray-700 mr-2" />
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-3 py-1 rounded">
              {getCategoryNames(product.category)}
            </span>
          </div>
        </div>

        {/* Price */}
        <p className="text-gray-800 font-semibold mt-3">
          <span>₺</span>
          {product.price && product.price.amount != null
            ? product.price.amount.toFixed(2)
            : "0.00"}
        </p>
      </div>
    </div>
  );
};

ProductSmallCard.propTypes = {
  product: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.number,
    customId: PropTypes.string,
    category: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ProductSmallCard;
