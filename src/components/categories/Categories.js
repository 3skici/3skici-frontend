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
          <div className="flex flex-col justify-center items-center">
            <button
              key={category._id}
              onClick={() => onCategorySelect(category)}
              className={`w-20 h-20 flex items-center justify-center text-2xl rounded-full cursor-pointer transition-colors duration-200 ${
                selectedCategory?._id === category._id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <img
                src={categoryIcons[category.name]}
                alt={`${category.name} icon`}
                className="w-15 h-15  object-contain"
              />
            </button>
            <span className="leading-tight mt-4">{category.name}</span>
          </div>
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
