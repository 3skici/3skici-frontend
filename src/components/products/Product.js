// Products.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/products/productsSlice";
import ProductCard from "./ProductCard";
import ProductSmallCard from "./ProductSmallCard";

const Products = () => {
  const dispatch = useDispatch();
  // Access products from Redux state
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);



  if (status === "loading") {
    return <div className="text-center">Loading products...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }


  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Available Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products && products.length > 0 ? (
            products.map((product) => (
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
