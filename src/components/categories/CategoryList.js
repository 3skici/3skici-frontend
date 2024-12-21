import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  selectCategories,
  selectLoading as selectCategoriesLoading,
} from "../../features/categories/categoriesSlice";
import {
  fetchProducts,
  fetchProductsByCategory,
  selectProducts,
  selectLoading as selectProductsLoading,
} from "../../features/products/productsSlice";
import Categories from "./Categories";
import ProductSmallCard from "../products/ProductSmallCard";

const CategoryList = () => {
  const dispatch = useDispatch();

  // Categories and Products from Redux store
  const categories = useSelector(selectCategories);
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const products = useSelector(selectProducts);
  const productsLoading = useSelector(selectProductsLoading);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories and all products when component mounts
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category) {
      // Fetch products for the selected category
      dispatch(fetchProductsByCategory(category._id));
    } else {
      // Fetch all products when no category is selected
      dispatch(fetchProducts());
    }
  };

  return (
    <div className="bg-off-white min-h-screen py-2">
      <div className="container mx-auto px-4">
        {/* Categories Component */}
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          loading={categoriesLoading}
        />

        {/* Selected Category Description */}
        {selectedCategory && (
          <div className="text-center">
            <h2 className="text-l font-bold text-gray-800 mb-4">
              {selectedCategory.name}
            </h2>
            {/* <p className="text-gray-600">{selectedCategory.description}</p> */}
          </div>
        )}

        {/* Products Section */}
        <div>
          {/* <h3 className="text-xl font-bold text-gray-800 mb-4">
            {selectedCategory ? `Products in ${selectedCategory.name}` : 'All Products'}
          </h3> */}
          {productsLoading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product) => (
                <ProductSmallCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 mt-4">
              {selectedCategory
                ? "No products available in this category."
                : "No products available."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
