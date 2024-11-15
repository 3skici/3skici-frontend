// components/FavoriteButton.js
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../features/products/favoriteSlice';

const FavoriteButton = ({ productId, userId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav._id === productId);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite({ userId, productId }));
    } else {
      dispatch(addFavorite({ userId, productId }));
    }
  };

  return isFavorite ? (
    <FaHeart
      className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300"
      onClick={handleToggleFavorite}
    />
  ) : (
    <FaRegHeart
      className="text-gray-500 cursor-pointer hover:text-red-500 transition duration-300"
      onClick={handleToggleFavorite}
    />
  );
};

export default FavoriteButton;
