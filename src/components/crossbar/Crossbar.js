import React, { useEffect, useState } from 'react';
import { selectCategories } from '../../features/categories/categoriesSlice';
import { useSelector } from 'react-redux';
import categoryIcons from "../../icons/categoryIcons";

const Crossbar = () => {
  const categories = useSelector(selectCategories);
  

  return (
    <nav className="bg-gray-800 text-white py-2">
      <ul className="flex justify-center flex-wrap">
        {categories.map((category) => (
          <li key={category._id} className="mx-2 my-1 px-3 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors">
            <a href={`/categories/${category._id}`} className="flex items-center space-x-2">
              <img src={categoryIcons[category.name]} alt={`${category.name} icon`} className="w-6 h-6" />
              <span>{category.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Crossbar;
