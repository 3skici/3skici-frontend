import React, { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import i18n from "../i18n";
import { getPathWithLanguage } from "../utils/pathHelpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const browseProduct = getPathWithLanguage("/browse-products", currentLanguage);
  const sellProduct = getPathWithLanguage("/selling-product", currentLanguage);
  
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-4">Buy and Sell Second-Hand Items Effortlessly and for Free</h1>
          <p className="text-lg mb-6">
            Discover great deals or turn your unused items into cash—all without any fees.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <Link
              to={sellProduct}
              className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-md font-semibold hover:bg-yellow-500 transition duration-200"
            >
              Start Selling
            </Link>
            <Link
              to={browseProduct}
              className="bg-blue-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
            >
              Browse Products
            </Link>
          </div>
          <div className="flex justify-center mt-8">
            <input
              type="text"
              className="px-4 py-2 w-full max-w-md rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Search for items..."
            />
            <button className="bg-yellow-400 px-4 py-2 rounded-r-md hover:bg-yellow-500 transition duration-200">
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <main className="flex-grow container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Products by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products && products.length > 0 ? (
            products.map((productItem) => (
            <ProductCard key={productItem._id} product={productItem} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
          No products available.
        </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default Home;
