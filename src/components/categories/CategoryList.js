import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories } from "../../features/categories/categoriesSlice";
import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "../products/ProductCard"; // Import your ProductCard component

const CategoryList = () => {
  const dispatch = useDispatch();
  
  // Categories and Products from Redux store
  const categories = useSelector(selectCategories); // Categories from Redux
  const products = useSelector((state) => state.products.items); // Products from Redux

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Dispatch actions to fetch categories and products from the backend
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on the selected category ID
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.category.includes(selectedCategory._id) // Check if the product's category array includes the selected category's ID
      )
    : products;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>
        
        {/* Categories */}
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          {categories.map((category) => (
            <div
              key={category._id}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 flex items-center justify-center rounded-lg bg-blue-500 text-white text-center font-bold cursor-pointer hover:bg-blue-600 transition-all ${
                selectedCategory?._id === category._id && "ring-4 ring-black-400"
              }`}
            >
              {category.name}
            </div>
          ))}
        </div>

        {/* Selected Category Description */}
        {selectedCategory && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedCategory.name}
            </h2>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>
        )}

        {/* Products Section */}
        {selectedCategory && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Products in {selectedCategory.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="text-center text-gray-600 mt-4">
                  No products available in this category.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
