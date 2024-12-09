import React, { useEffect } from "react";
import ProductCard from "../components/products/ProductCard";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import i18n from "../i18n";
import { getPathWithLanguage } from "../utils/pathHelpers";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { fetchCategories } from "../features/categories/categoriesSlice";
import { fetchFavorites } from "../features/products/favoriteSlice";
import ProductSmallCard from "../components/products/ProductSmallCard";
import Crossbar from "../components/crossbar/Crossbar";
import CategoryList from "../components/categories/CategoryList";

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const browseProduct = getPathWithLanguage(
    "/browse-products",
    currentLanguage
  );
  const sellProduct = getPathWithLanguage("/selling-product", currentLanguage);

  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          
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

      <section className="bg-gray-100">
        <div className="container mx-auto">
          <CategoryList />
        </div>
      </section>
    </div>
  );
};

export default Home;
