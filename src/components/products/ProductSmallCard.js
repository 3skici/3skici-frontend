import React, { useEffect, useState } from "react";
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
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS
import { getImageUrl } from "../../utils/imgagesHelper";
import { format } from "timeago.js";
import currencyIcons from "../../assets/icons/currencyIcons ";

const ProductSmallCard = ({ product, isFetchedFromParent = false }) => {
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
  const hasFetchedFavorites = useSelector((state) => state.hasFetched);
  const isFavorited = favorites.some((fav) => fav._id === product._id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (!userId) {
      return toast.error("You need to log in to add favorites.");
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
    <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
      {/* Product Image and Favorite Icon */}
      <div
        className="relative cursor-pointer rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
        onClick={handleProductClick}
      >
        <img
          src={
            getImageUrl(product.images[0]) || "https://via.placeholder.com/150"
          }
          alt={product.name || "Product image"}
          className="w-full h-32 xs:h-40 sm:h-48 md:h-56 object-cover aspect-[3/2]"
          loading="lazy"
          decoding="async"
        />

        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${
            isFavorited ? "text-rose-700" : "text-gray-600"
          } hover:scale-105 active:scale-95 z-10`}
          aria-label={
            isFavorited ? "Remove from favorites" : "Add to favorites"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6 sm:w-7 sm:h-7 hover:text-rose-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              className={`${
                isFavorited ? "fill-current text-rose-700" : "fill-transparent"
              }`}
            />
          </svg>
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4  sm:p-6 md:p-8 flex flex-col h-full">
        <div className="flex flex-row justify-between items-start sm:items-centers">
          {/* Product name */}
          <div className="flex flex-col flex-grow min-w-0">
            <span
              className="text-base sm:text-lg font-bold truncate overflow-hidden hover:overflow-visible hover:whitespace-normal transition-all duration-200"
              title={product.name || "No product name"}
            >
              {product.name || "No product name"}
            </span>
          </div>

          {/* Price */}
          <div className="flex-shrink-0 pl-4">
            <span className="font-bold text-red-600 text-base sm:text-lg whitespace-nowrap">
              <span className="mr-1">
                {currencyIcons[product.price.currency] ||
                  product.price.currency}
              </span>
              {product.price?.amount?.toLocaleString() ?? "0.00"}
            </span>
          </div>
        </div>

        {/* description */}
        <div className="flex items-center mb-2 mt-3">
          <span
            className="text-base md:text-lg font-semibold text-[#7281a3] max-w-full md:max-w-[300px] lg:max-w-[400px] overflow-hidden line-clamp-2 md:line-clamp-3 hover:text-[#5a678a] transition-colors duration-200"
            title={product.description}
          >
            {product.description}
          </span>
        </div>

        {/* Card Footer */}
        <div className="flex justify-between md:flex-row md:justify-between md:gap-0 text-xs md:text-sm text-gray-500">
          <div>
            <span className="truncate">{product.location.city}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="whitespace-nowrap">
              {format(product.createdAt)}
            </span>
          </div>
        </div>
      </div>

      {/* ToastContainer for displaying the toast notifications */}
      <ToastContainer />
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
