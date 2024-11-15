import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import { FaHeart, FaCartPlus } from "react-icons/fa";

const ProductSearchAndFilter = () => {
  const dispatch = useDispatch();
  const { items: products, status } = useSelector((state) => state.products);
  console.log("this is items: ", products);
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
              product.name?.toLowerCase().includes(filters.name.toLowerCase())) &&
            (filters.condition === "" ||
              product.condition?.toLowerCase() === filters.condition.toLowerCase()) &&
            (filters.priceMin === "" ||
              product.price?.amount >= parseFloat(filters.priceMin)) &&
            (filters.priceMax === "" ||
              product.price?.amount <= parseFloat(filters.priceMax)) &&
            (filters.category === "" ||
              product.category?.toLowerCase() === filters.category.toLowerCase()) &&
            (filters.customId === "" ||
              product.customId?.toLowerCase().includes(filters.customId.toLowerCase())) &&
            (filters.availability === "" ||
              (filters.availability === "available" ? product.status === "available" : product.status !== "available")) &&
            (filters.seller === "" ||
              product.seller?.toLowerCase().includes(filters.seller.toLowerCase()))
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
              <div
                key={product._id}
                className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative"
              >
                <div className="absolute top-2 right-2">
                  <FaHeart className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300" />
                </div>
                <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.status === "available" ? "Available" : "Sold Out"}
                </div>
                <div className="flex justify-center items-center h-56 bg-gray-200">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-500 text-lg">
                      {product.name}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {product.name}
                  </h2>
                  <p className="text-gray-900 text-2xl font-bold mb-4">
                    {product.price?.amount} {product.price?.currency || "TL"}
                  </p>
                  <p className="text-gray-700 mb-2 truncate">
                    {product.description || "No description available"}
                  </p>
                  <p className="text-gray-500">
                    Condition: {product.condition || "Unknown"}
                  </p>
                  <p className="text-gray-500">
                    Category: {product.category || "Uncategorized"}
                  </p>
                  <p className="text-gray-500">
                    Seller: {product.seller || "Not found"}
                  </p>
                </div>
                <div className="flex flex-col items-center p-4 border-t space-y-2">
                  <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full justify-center">
                    <FaCartPlus className="mr-2" /> Add to Cart
                  </button>
                  <p className="text-xs text-gray-500">
                    ID: {product.customId}
                  </p>
                </div>
              </div>
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
