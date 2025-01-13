import React, { useEffect } from "react";
import ProductSmallCard from "../components/products/ProductSmallCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

const BrowseProducts = () => {
  const products = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-6 px-8">
      {products &&
        products.map((product) => (
          <ProductSmallCard key={product._id} product={product} />
        ))}
    </div>
  );
};

export default BrowseProducts;
