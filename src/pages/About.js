import React from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/layout/Navbar";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          {t("about_hero_title")}
        </h1>
        {/* Introductory Text */}
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
          {t("about_introductory_text")}
        </p>
        {/* Unique Features Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-blue-500">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 flex items-center">
            <span className="material-icons mr-2">star</span>
            {t("unique_features.title")}
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>{t("unique_features.free_service")}</p>
            <p>{t("unique_features.report_products")}</p>
          </div>
        </section>

        {/* Returns Policy Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-green-500">
          <h2 className="text-3xl font-bold text-green-600 mb-4 flex items-center">
            <span className="material-icons mr-2">assignment_return</span>
            {t("returns_policy.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("returns_policy.info")}
          </p>
        </section>

        {/* Delivery Service Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-purple-500">
          <h2 className="text-3xl font-bold text-purple-600 mb-4 flex items-center">
            <span className="material-icons mr-2">local_shipping</span>
            {t("delivery_service.title")}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t("delivery_service.info")}
          </p>
        </section>

        {/* 3skici in Numbers Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-orange-500">
          <h2 className="text-3xl font-bold text-orange-600 mb-4 flex items-center">
            <span className="material-icons mr-2">
            {t("in_numbers_title")}
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">567</h3>
              <p className="text-gray-600">Items for Sale</p>
            </div>
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">890</h3>
              <p className="text-gray-600">Successful Transactions</p>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-red-500">
          <h2 className="text-3xl font-bold text-red-600 mb-4 flex items-center">
            <span className="material-icons mr-2">{t("contact_us.title")}</span>
            
          </h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              <strong>Phone Number:</strong> {t("contact_us.phone")}
            </p>
            <p>
              <strong>Email:</strong> {t("contact_us.email")}
            </p>
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          <button className="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {t("contact_us.button")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
