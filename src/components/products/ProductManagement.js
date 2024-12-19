// src/components/Products/Products.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import {
  fetchCategories,
  selectCategories,
} from "../../features/categories/categoriesSlice";
import ProductSmallCard from "./ProductSmallCard";
import FilterPanel from "./FilterPanel";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const categories = useSelector(selectCategories);

  const [filters, setFilters] = useState({
    category: [],
    price: "",
    condition: "",
    status: "",
  });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  // Calculate product count per category
  const categoriesWithCount = useMemo(() => {
    return categories.map((category) => ({
      ...category,
      productCount: products.filter(
        (product) =>
          Array.isArray(product.category) &&
          product.category.includes(category._id)
      ).length,
    }));
  }, [categories, products]);

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      let isMatch = true;

      // Filter by category (check if any of the product's categories are in selected categories)
      if (
        filters.category.length > 0 &&
        !product.category.some((catId) => filters.category.includes(catId))
      ) {
        isMatch = false;
      }

      // Filter by price range
      if (filters.price) {
        if (filters.price === "200+") {
          if (product.price.amount < 200) isMatch = false;
        } else {
          const [minPrice, maxPrice] = filters.price.split("-").map(Number);
          if (
            product.price.amount < minPrice ||
            (maxPrice && product.price.amount > maxPrice)
          ) {
            isMatch = false;
          }
        }
      }

      // Filter by condition
      if (filters.condition && product.condition !== filters.condition) {
        isMatch = false;
      }

      // Filter by status
      if (filters.status && product.status !== filters.status) {
        isMatch = false;
      }

      return isMatch;
    });
  }, [products, filters]);

  if (status === "loading") {
    return <div className="text-center">Loading products...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 flex">
      {/* Pass categoriesWithCount to FilterPanel */}
      <FilterPanel
        onFilterChange={handleFilterChange}
        categories={categoriesWithCount}
      />
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Available Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductSmallCard key={product._id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No products available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
