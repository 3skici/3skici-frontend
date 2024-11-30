// src/components/CategoryList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, selectCategories, selectLoading as selectCategoriesLoading } from '../../features/categories/categoriesSlice';
import { fetchProductsByCategory, selectProducts, selectLoading as selectProductsLoading } from '../../features/products/productsSlice';
import ProductCard from '../products/ProductCard';
import Categories from './Categories'; 
const CategoryList = () => {
  const dispatch = useDispatch();

  // Categories and Products from Redux store
  const categories = useSelector(selectCategories);
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const products = useSelector(selectProducts);
  const productsLoading = useSelector(selectProductsLoading);

  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Fetch products for the selected category
    dispatch(fetchProductsByCategory(category._id));
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Categories</h1>

        {/* Categories Component */}
        <Categories
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          loading={categoriesLoading}
        />

        {/* Selected Category Description */}
        {selectedCategory && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedCategory.name}</h2>
            <p className="text-gray-600">{selectedCategory.description}</p>
          </div>
        )}

        {/* Products Section */}
        {selectedCategory && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Products in {selectedCategory.name}</h3>
            {productsLoading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 mt-4">No products available in this category.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
