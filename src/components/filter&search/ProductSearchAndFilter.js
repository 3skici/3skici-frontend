import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../../features/products/productsSlice";
import ProductCard from "../products/ProductCard";
import { fetchCategories } from "../../features/categories/categoriesSlice";

const ProductSearchAndFilter = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories.categories);
  const [filters, setFilters] = useState({
    name: "",
    condition: "",
    priceMin: "",
    priceMax: "",
    category: "",
    customId: "",
    availability: "",
    seller: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleCategoryChange = (categoryId) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(categoryId)
        ? prev.category.filter((id) => id !== categoryId)
        : [...prev.category, categoryId],
    }));
  };

  const filteredProducts =
    status === "succeeded"
      ? products.filter((product) => {
          const matchesName =
            !filters.name ||
            product.name?.toLowerCase().includes(filters.name.toLowerCase());
          const matchesCondition =
            !filters.condition ||
            product.condition?.toLowerCase() ===
              filters.condition.toLowerCase();
          const matchesPriceMin =
            !filters.priceMin ||
            product.price?.amount >= parseFloat(filters.priceMin);
          const matchesPriceMax =
            !filters.priceMax ||
            product.price?.amount <= parseFloat(filters.priceMax);
          const matchesCategory =
            !filters.category.length ||
            product.category?.some((cat) => filters.category.includes(cat._id));
          const matchesCustomId =
            !filters.customId ||
            product.customId
              ?.toLowerCase()
              .includes(filters.customId.toLowerCase());
          const matchesAvailability =
            !filters.availability ||
            (filters.availability === "available"
              ? product.status === "available"
              : product.status !== "available");
          const matchesSeller =
            !filters.seller ||
            product.seller.name
              ?.toLowerCase()
              .includes(filters.seller.toLowerCase());

          return (
            matchesName &&
            matchesCondition &&
            matchesPriceMin &&
            matchesPriceMax &&
            matchesCategory &&
            matchesCustomId &&
            matchesAvailability &&
            matchesSeller
          );
        })
      : [];

  const clearFilters = () => {
    setFilters({
      name: "",
      condition: "",
      priceMin: "",
      priceMax: "",
      category: [],
      customId: "",
      availability: "",
      seller: "",
    });
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 lg:p-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center text-gray-800">
          Discover Available Products
        </h1>

        {/* Filter Panel */}
        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filter Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Name Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Search by name..."
                value={filters.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Condition Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Condition
              </label>
              <select
                name="condition"
                value={filters.condition}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white"
              >
                <option value="">All Conditions</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="refurbished">Refurbished</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-1 lg:col-span-2">
              <label className="text-sm font-medium text-gray-600">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="priceMin"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Categories
              </label>
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <label
                      key={category._id}
                      className={`flex items-center px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                        filters.category.includes(category._id)
                          ? "bg-blue-50 border-blue-200"
                          : "bg-gray-50 border-gray-200 hover:border-blue-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={filters.category.includes(category._id)}
                        onChange={() => handleCategoryChange(category._id)}
                        className="hidden"
                      />
                      <span
                        className={`text-sm ${
                          filters.category.includes(category._id)
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {category.name}
                      </span>
                      <span
                        className={`ml-1.5 text-lg ${
                          filters.category.includes(category._id)
                            ? "text-blue-500 opacity-100"
                            : "opacity-0"
                        }`}
                      >
                        ✓
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Availability
              </label>
              <select
                name="availability"
                value={filters.availability}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 bg-white"
              >
                <option value="">All Statuses</option>
                <option value="available">Available</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>

            {/* Seller Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Seller
              </label>
              <input
                type="text"
                name="seller"
                placeholder="Search seller..."
                value={filters.seller}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>

            {/* Custom ID Filter */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Custom ID
              </label>
              <input
                type="text"
                name="customId"
                placeholder="Search by ID..."
                value={filters.customId}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {status === "loading" ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin w-12 h-12 mx-auto text-blue-500">
                <svg
                  className="w-full h-full"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <p className="mt-4 text-gray-500">Loading products...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <svg
                className="w-16 h-16 mx-auto text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="mt-4 text-gray-500 text-lg">
                No products found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;
