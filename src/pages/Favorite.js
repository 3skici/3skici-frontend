import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites } from "../features/products/favoriteSlice"; // Adjust import path
import ProductSmallCard from "../components/products/ProductSmallCard";
import { FaShareSquare, FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS

const Favorites = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?._id);
  const { favorites, loading, error } = useSelector((state) => state.favorites);

  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [userId, dispatch]);

  // Handle share action
  const handleShareFavorite = (productName) => {
    alert(`Sharing ${productName}`);
  };

  // Show error toast if there is an error in fetching favorites
  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading favorites...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-10">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 flex justify-center items-center space-x-3">
            <FaHeart className="text-red-500" />
            <span>Your Favorites</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Browse your saved products. Click the heart again to remove, or
            share them with friends!
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((product) => (
              <div key={product._id} className="relative group">
                {/* Product Card */}
                <ProductSmallCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-16">
            <FaHeart className="text-red-400 mb-4" size={48} />
            <p className="text-gray-500 text-lg text-center max-w-md">
              You haven't added any favorites yet. Start exploring our products
              and add some of them to your favorites list by clicking the heart
              icon!
            </p>
          </div>
        )}
      </div>
      {/* ToastContainer for displaying the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Favorites;
