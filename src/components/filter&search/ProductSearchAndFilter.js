import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import ProductSmallCard from "../products/ProductSmallCard";
import ProductCard from "../products/ProductCard";

const ProductSearchAndFilter = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
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
    }
  }, [status, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredProducts =
    status === "succeeded"
      ? products.filter((product) => {
          return (
            (filters.name === "" ||
              product.name
                ?.toLowerCase()
                .includes(filters.name.toLowerCase())) &&
            (filters.condition === "" ||
              product.condition?.toLowerCase() ===
                filters.condition.toLowerCase()) &&
            (filters.priceMin === "" ||
              product.price?.amount >= parseFloat(filters.priceMin)) &&
            (filters.priceMax === "" ||
              product.price?.amount <= parseFloat(filters.priceMax)) &&
            (filters.category === "" ||
              product.category?.toLowerCase() ===
                filters.category.toLowerCase()) &&
            (filters.customId === "" ||
              product.customId
                ?.toLowerCase()
                .includes(filters.customId.toLowerCase())) &&
            (filters.availability === "" ||
              (filters.availability === "available"
                ? product.status === "available"
                : product.status !== "available")) &&
            (filters.seller === "" ||
              product.seller
                ?.toLowerCase()
                .includes(filters.seller.toLowerCase()))
          );
        })
      : [];

  // Function to clear filters
  const clearFilters = () => {
    setFilters({
      name: "",
      condition: "",
      priceMin: "",
      priceMax: "",
      category: "",
      customId: "",
      availability: "",
      seller: "",
    });
  };

  return (
    <div>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Available Products
        </h1>

        {/* filtering panel */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Filter Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Search by Name"
                value={filters.name}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Condition</label>
              <input
                type="text"
                name="condition"
                placeholder="Filter by Condition"
                value={filters.condition}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-gray-600 mb-1">Price Range</label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  name="priceMin"
                  placeholder="Min Price"
                  value={filters.priceMin}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 flex-1"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  name="priceMax"
                  placeholder="Max Price"
                  value={filters.priceMax}
                  onChange={handleInputChange}
                  className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 flex-1"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Filter by Category"
                value={filters.category}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Custom ID</label>
              <input
                type="text"
                name="customId"
                placeholder="Filter by Custom ID"
                value={filters.customId}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Availability</label>
              <select
                name="availability"
                value={filters.availability}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              >
                <option value="">All</option>
                <option value="available">Available</option>
                <option value="sold">Sold Out</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">Seller</label>
              <input
                type="text"
                name="seller"
                placeholder="Filter by Seller"
                value={filters.seller}
                onChange={handleInputChange}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {status === "loading" ? (
            <p className="text-center text-gray-500">Loading products...</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              No products match your search criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;
