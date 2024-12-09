// src/components/Categories.js
import React from "react";
import PropTypes from "prop-types";
import categoryIcons from "../../icons/categoryIcons";

const Categories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  loading,
}) => {
  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
   <div className="mb-6 p-4">
     <div className="flex flex-wrap gap-4">
      {categories.map((category) => (
        <>
          <button
            key={category._id}
            onClick={() => onCategorySelect(category)}
            className={`px-3 py-2 flex items-center text-sm rounded-lg whitespace-nowrap text-center font-bold cursor-pointer transition-colors duration-200 ${
              selectedCategory?._id === category._id 
               ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <img
              src={categoryIcons[category.name]}
              alt={`${category.name} icon`}
               className="w-5 h-5 mr-2 object-contain"
            />

            <span className="leading-tight">{category.name}</span>
          </button>
        </>
      ))}
    </div>
   </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onCategorySelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Categories;
