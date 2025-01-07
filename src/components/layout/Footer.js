import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Define your routes with language
  const about = getPathWithLanguage("/about-us", currentLanguage);
  const sitemap = getPathWithLanguage("/sitemap", currentLanguage);
  const sustainability = getPathWithLanguage(
    "/3skici-and-sustainability",
    currentLanguage
  );

  const privacy = getPathWithLanguage("/privacy-policy", currentLanguage);
  const terms = getPathWithLanguage("/terms-and-conditions", currentLanguage);
  const faq = getPathWithLanguage("/faq", currentLanguage);
  const contact = getPathWithLanguage("/contact-us", currentLanguage);

  // // handle language change
  // const handleLanguageChange = (lang) => {
  //   i18n.changeLanguage(lang, () => {
  //     setLanguageDropdownOpen(false);

  //     // Update the current URL with the new language
  //     const currentPath = location.pathname;
  //     const newSlug = getPathWithLanguage(currentPath, lang);
  //     navigate(newSlug);
  //   });
  // };

  // // lang switcher drop
  // const toggleLanguageDropdown = () => {
  //   setLanguageDropdownOpen(!languageDropdownOpen);
  //   setProfileDropdown(false);
  // };

  // // language switcher
  // const languages = [
  //   { code: "ar", label: "Arabic", icon: "🇾🇪" },
  //   { code: "tr", label: "Turkish", icon: "🇹🇷" },
  //   { code: "en", label: "English", icon: "🇬🇧" },
  // ];

  // // handle closing outside language drop
  // const handleClickOutside = (event) => {
  //   if (!event.target.closest(".dropdown")) {
  //     setLanguageDropdownOpen(false);
  //     setProfileDropdown(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("click", handleClickOutside);

  //   const handleLanguageChanged = (lang) => {
  //     setCurrentLanguage(lang);
  //   };

  //   i18n.on("languageChanged", handleLanguageChanged);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //     i18n.off("languageChanged", handleLanguageChanged);
  //   };
  // }, []);

  return (
    <footer className="bg-[#7e193e] text-white py-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Left Column: 3skici Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">3skici</h3>

            <ul className="space-y-2">
              <Link
                to={about}
                className=" hover:text-red-300 transition duration-200"
              >
                {t("about_us_nav")}
              </Link>
              <li>
                <Link
                  to={sitemap}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("sitemap")}
                </Link>
              </li>
              <li>
                <Link
                  to={sustainability}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("sustainability")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Middle Column: Help & Support */}
          <div>
            <h3 className="font-semibold  text-xl mb-4">
              {t("help_and_support")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={privacy}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("privacy_policy")}
                </Link>
              </li>
              <li>
                <Link
                  to={terms}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("terms_and_conditions")}
                </Link>
              </li>
              <li>
                <Link
                  to={faq}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("faq")}
                </Link>
              </li>
              <li>
                <Link
                  to={contact}
                  className=" hover:text-red-300 transition duration-200"
                >
                  {t("contact_us_text")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column: Regular Visited Links */}
          <div>
            <h3 className="font-semibold  text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={getPathWithLanguage("/selling-product", currentLanguage)}
                  className="  hover:text-red-300 py-2 lg:py-0"
                >
                  {t("selling_product")}
                </Link>
              </li>
              <li>
                <Link
                  to={getPathWithLanguage("/categories", currentLanguage)}
                  className="  hover:text-red-300 py-2 lg:py-0"
                >
                  {t("categories")}
                </Link>
              </li>
              <li>
                <Link
                  to={getPathWithLanguage("/filter", currentLanguage)}
                  className="  hover:text-red-300 py-2 lg:py-0"
                >
                  {t("advance_search")}
                </Link>
              </li>
              <li>
                <Link
                  to={getPathWithLanguage("/report", currentLanguage)}
                  className="   hover:text-red-300 py-2 lg:py-0"
                >
                  {t("report_product")}
                </Link>
              </li>
            </ul>
          </div>
          {/* Language Switcher Dropdown */}
        </div>

        {/* Social Media Section */}
        {/* <div className="flex justify-center space-x-6 mt-10">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-red-300 transition duration-200"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-red-300 transition duration-200"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" hover:text-red-300 transition duration-200"
          >
            Instagram
          </a>
        </div> */}
        <div></div>
        {/* Copyright */}
        <div className="text-center text-gray-100 mt-8">
          &copy; {new Date().getFullYear()} {t("copyright_notice")}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
