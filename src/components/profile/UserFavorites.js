// UserFavorites.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { removeFavorite } from "../../features/products/favoriteSlice"; // Import your remove action
import { getImageUrl } from "../../utils/imgagesHelper";

const UserFavorites = () => {
  const currentLanguage = i18n.language;
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);

  const handleRemoveFavorite = async (productId) => {
    try {
      await dispatch(
        removeFavorite({
          userId: user._id,
          productId,
          token: user.token,
        })
      ).unwrap();
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(error.message || "Failed to remove favorite");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaHeart className="text-red-500 animate-pulse" />
          Favorite Products
        </h2>
        <p className="text-gray-500 mt-1">
          Your curated collection of loved items
        </p>
      </div>

      {favorites?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">
            No favorites yet. Start adding products you love!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites?.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 relative"
            >
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleRemoveFavorite(product._id)}
                  className="p-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <FaHeart className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  {product.images?.[0] && (
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500">{product.category}</p>
                  <p className="text-lg font-medium text-blue-600 mt-1">
                    {product.price.amount} {product.price.currency}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-4">
                <Link
                  to={getPathWithLanguage(
                    `/product/${product.customId}`,
                    currentLanguage
                  )}
                  className="text-blue-600 hover:text-blue-700"
                >
                  View Product
                </Link>
                <button
                  onClick={() => handleRemoveFavorite(product._id)}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-600"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserFavorites;
