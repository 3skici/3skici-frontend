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
    <div className="flex justify-center flex-wrap gap-6 mb-8">
      {categories.map((category) => (
        <>
          <button
            key={category._id}
            onClick={() => onCategorySelect(category)}
            className={`px-4 py-2 flex items-center justify-center rounded-lg bg-blue-500 text-white text-center font-bold cursor-pointer hover:bg-blue-600 transition-all ${
              selectedCategory?._id === category._id && "ring-4 ring-black-400"
            }`}
          >
          <img src={categoryIcons[category.name]} alt={`${category.name} icon`} />

            {category.name}
          </button>
        </>
      ))}
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
