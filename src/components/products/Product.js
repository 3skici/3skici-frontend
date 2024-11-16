// Products.js
import React, { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/products/productsSlice'; // Adjust the import path
import { addFavorite, removeFavorite } from '../../features/products/favoriteSlice';

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.user._id)
  const { favorites } = useSelector((state) => state.favorites);
  // Access products from Redux state
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleToggleFavorite = (productId) => {
    if (favorites.some((fav) => fav._id === productId)) {
    dispatch(removeFavorite({userId, productId}))
  } else {
    dispatch(addFavorite({ userId, productId }));
  }

}
  const handleReport = (productId) => {
    navigate(`/report/${productId}`);
  };

  if (status === 'loading') {
    return <div className="text-center">Loading products...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Available Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative"
              >
                {/* Favorite Icon */}
                <div className="absolute top-2 right-2">
                 {/* Show filled heart if product is in favorites, otherwise outline heart */}
                 {favorites.some((fav) => fav._id === product._id) ? (
                    <FaHeart
                      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
                      onClick={() => handleToggleFavorite(product._id)}
                    />
                  ) : (
                    <FaRegHeart
                      className="text-gray-500 cursor-pointer hover:text-red-500 transition duration-300"
                      onClick={() => handleToggleFavorite(product._id)}
                    />
                  )}
                 </div>

                {/* Product Availability Status */}
                <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.isAvailable ? 'Available' : 'Sold Out'}
                </div>

                {/* Product Image */}
                <div className="flex justify-center items-center h-56 bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src="/images/default.jpg" // Ensure this is a valid fallback path
                      alt="Default"
                      className="object-cover w-full h-full"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-900 text-2xl font-bold mb-4">
                    {product.price
                      ? `${product.price.amount} ${product.price.currency}`
                      : 'Price not available'}
                  </p>
                  <p className="text-gray-700 mb-2 truncate">
                    {product.description || 'No description available'}
                  </p>
                  <p className="text-gray-500">
                    Condition: {product.condition || 'Unknown'}
                  </p>
                  <p className="text-gray-500">
                    Category: {product.category?.name || 'Not categorized'}
                  </p>
                  <p className="text-gray-500">
                    Seller: {product.seller?.name || 'Not found'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col items-center p-4 border-t space-y-2">
                  <button
                    onClick={() => handleReport(product._id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 w-full justify-center"
                  >
                    Report Product
                  </button>
                  <p className="text-xs text-gray-500">ID: {product.customId}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
