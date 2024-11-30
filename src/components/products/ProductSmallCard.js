import React, { useState } from "react";
import PropTypes from 'prop-types';

const ProductSmallCard = ({ product = {} }) => {

  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden m-2">
      {/* Product Image and Favorite Icon */}
      <div className="relative">
        <img
          src={product.imageUrl || 'https://via.placeholder.com/150'}
          alt={product.name || 'No product name'}
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md transition-color ${
            isFavorited ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5 hover:text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              className={`${
                isFavorited ? 'fill-current text-red-500' : 'fill-transparent'
              }`}
            />
          </svg>
        </button>
      </div>
      {/* Product Info */}
      <div className="p-1.5 flex flex-col justify-between h-24">
        <h2 className="text-lg font-semibold truncate mb-2">
          {product.name || 'No product name'}
        </h2>
        <p className="text-gray-600 font-bold mt-auto">
        ${product.price && product.price.amount != null ? product.price.amount.toFixed(2) : '0.00'}
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
  }),
};

export default ProductSmallCard;
