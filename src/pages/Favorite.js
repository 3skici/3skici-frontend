import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFavorite } from '../features/products/favoriteSlice'; // Adjust import path

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user._id); // Assuming user info is stored in auth slice
  const { favorites, loading, error } = useSelector((state) => state.favorites); // Access favorites state from Redux

  // Fetch favorites when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      dispatch(fetchFavorites(userId));
    }
  }, [userId, dispatch]);

  // Remove favorite product
  const handleRemoveFavorite = (productId) => {
    dispatch(removeFavorite({ userId, productId }));
  };

  // Share favorite product (you can replace this with actual share logic)
  const handleShareFavorite = (productName) => {
    alert(`Sharing ${productName}`);
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading favorites...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Favorites Page</h1>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Saved Products</h2>
        {favorites.length > 0 ? (
          <ul className="space-y-4">
            {favorites.map((product) => (
              <li
                key={product._id}
                className="flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <div>
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  {/* <p className="text-sm text-gray-600">Price: {product.price}</p> */}
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleRemoveFavorite(product._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleShareFavorite(product.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Share
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No favorites saved yet.</p>
        )}
      </div>

      <div className="bg-white mt-6 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
        <p className="text-gray-600">Alerts for price changes or updates on favorited items will be shown here.</p>
      </div>
    </div>
  );
};

export default FavoritesPage;
