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
import ProductSmallCard from "../components/products/ProductSmallCard";
import Crossbar from "../components/crossbar/Crossbar";
import CategoryList from "../components/categories/CategoryList";
import HeroSection from "../components/layout/HeroSection";

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
    <div className="flex bg-light-beige flex-col min-h-screen">
      {/* Hero Section */}
      <div>
        <HeroSection />
      </div>
      <section>
        <div className="container mx-auto">
          <CategoryList />
        </div>
      </section>
    </div>
  );
};

export default Home;
