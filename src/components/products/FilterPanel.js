// src/components/Products/FilterPanel.jsx
import React, { useState } from "react";

const FilterPanel = ({ onFilterChange, categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    let updatedCategories;
    if (value === "all") {
      if (selectedCategories.length === categories.length) {
        updatedCategories = [];
      } else {
        updatedCategories = categories.map((category) => category._id);
      }
    } else {
      // Add or remove individual category
      updatedCategories = selectedCategories.includes(value)
        ? selectedCategories.filter((catId) => catId !== value)
        : [...selectedCategories, value];
    }

    setSelectedCategories(updatedCategories);
    // **Important: Update the parent with new categories**
    onFilterChange("category", updatedCategories);
  };

  const handleConditionChange = (e) => {
    setSelectedCondition(e.target.value);
    onFilterChange("condition", e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    onFilterChange("status", e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(e.target.value);
    onFilterChange("price", e.target.value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCondition("");
    setSelectedStatus("");
    setPriceRange("");
    // Also clear filters in the parent state:
    onFilterChange("category", []);
    onFilterChange("condition", "");
    onFilterChange("status", "");
    onFilterChange("price", "");
  };

  return (
    <div className="w-full md:w-1/4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

      {/* Category Filter with Checkboxes */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <div className="mt-2">
          <label className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              value="all"
              checked={
                selectedCategories.length === categories.length &&
                categories.length > 0
              }
              onChange={handleCategoryChange}
              className="form-checkbox"
            />
            <span className="ml-2">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category._id} className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value={category._id}
                checked={selectedCategories.includes(category._id)}
                onChange={handleCategoryChange}
                className="form-checkbox"
              />
              <span className="ml-2">
                {category.name} ({category.productCount})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Condition
        </label>
        <select
          value={selectedCondition}
          onChange={handleConditionChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Any Condition</option>
          <option value="new">New</option>
          <option value="used">Used</option>
        </select>
      </div>

      {/* Status Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={selectedStatus}
          onChange={handleStatusChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">Any Status</option>
          <option value="available">Available</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">
          Price Range
        </label>
        <select
          value={priceRange}
          onChange={handlePriceChange}
          className="w-full mt-2 p-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Prices</option>
          <option value="0-50">0 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100-200">100 - 200</option>
          <option value="200+">200+</option>
        </select>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-6 text-center">
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
