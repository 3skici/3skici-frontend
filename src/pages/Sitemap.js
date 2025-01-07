import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Sitemap = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t("sitemap")}</h1>
        
        {/* Main Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t("main_sections")}</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-blue-600 hover:underline">{t("home")}</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:underline">{t("about_us")}</Link>
            </li>
            <li>
              <Link to="/faq" className="text-blue-600 hover:underline">{t("faq")}</Link>
            </li>
            <li>
              <Link to="/contact" className="text-blue-600 hover:underline">{t("contact_us")}</Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t("categories")}</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/category/electronics" className="text-blue-600 hover:underline">{t("electronics")}</Link>
            </li>
            <li>
              <Link to="/category/clothing" className="text-blue-600 hover:underline">{t("clothing")}</Link>
            </li>
            <li>
              <Link to="/category/books" className="text-blue-600 hover:underline">{t("books")}</Link>
            </li>
            <li>
              <Link to="/category/furniture" className="text-blue-600 hover:underline">{t("furniture")}</Link>
            </li>
          </ul>
        </div>

        {/* User Account Links */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t("user_account")}</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/profile" className="text-blue-600 hover:underline">{t("profile")}</Link>
            </li>
            <li>
              <Link to="/my-listings" className="text-blue-600 hover:underline">{t("my_listings")}</Link>
            </li>
            <li>
              <Link to="/favorites" className="text-blue-600 hover:underline">{t("favorites")}</Link>
            </li>
          </ul>
        </div>

        {/* Footer Links */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4">{t("footer_links")}</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/terms" className="text-blue-600 hover:underline">{t("terms_and_conditions")}</Link>
            </li>
            <li>
              <Link to="/privacy" className="text-blue-600 hover:underline">{t("privacy_policy")}</Link>
            </li>
            <li>
              <Link to="/help" className="text-blue-600 hover:underline">{t("help_center")}</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
