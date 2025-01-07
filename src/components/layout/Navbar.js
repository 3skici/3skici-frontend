import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { IoMdArrowDropdown } from "react-icons/io";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { getImageUrl } from "../../utils/imgagesHelper";
import logo from "../../assets/logos/logo2.svg";

const Navbar = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const user = useSelector((state) => state.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfileDropdown = () => setProfileDropdown(!profileDropdown);
  const handleLogout = () => dispatch(logout());

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang, () => {
      setLanguageDropdownOpen(false);

      // Update the current URL with the new language
      const currentPath = location.pathname;
      const newSlug = getPathWithLanguage(currentPath, lang);
      navigate(newSlug);
    });
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setLanguageDropdownOpen(false);
      setProfileDropdown(false);
    }
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    setProfileDropdown(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    const handleLanguageChanged = (lang) => {
      setCurrentLanguage(lang);
    };

    i18n.on("languageChanged", handleLanguageChanged);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      i18n.off("languageChanged", handleLanguageChanged);
    };
  }, []);

  const languages = [
    { code: "ar", label: "Arabic", icon: "🇾🇪" },
    { code: "tr", label: "Turkish", icon: "🇹🇷" },
    { code: "en", label: "English", icon: "🇬🇧" },
  ];

  return (
    <nav className="bg-gray-50 shadow-md">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="3skici"
                className="w-28 sm:w-32 md:w-40 lg:w-48 object-contain"
              />
            </Link>
          </div>

          {/* Hamburger menu button for small screens */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link
              to={getPathWithLanguage("/categories", currentLanguage)}
              className="text-gray-700 hover:text-gray-900"
            >
              {t("navbar:categories")}
            </Link>
            <Link
              to={getPathWithLanguage("/search", currentLanguage)}
              className="text-gray-700 hover:text-gray-900"
            >
              {t("navbar:search")}
            </Link>
            <Link
              to={getPathWithLanguage("/browse", currentLanguage)}
              className="text-gray-700 hover:text-gray-900"
            >
              {t("navbar:browse_products")}
            </Link>
          </div>

          {/* Profile and Language Section */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <Link
                to={getPathWithLanguage("/login", currentLanguage)}
                className="bg-fiery-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                {t("navbar:login")}
              </Link>
            ) : (
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleProfileDropdown}
                  className="relative flex items-center justify-center rounded-full focus:outline-none"
                  aria-expanded={profileDropdown}
                  aria-haspopup="true"
                >
                  <img
                    src={getImageUrl(user?.avatar)}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 ring-1 ring-black/5">
                    <Link
                      to={getPathWithLanguage("/profile", currentLanguage)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("profile")}
                    </Link>
                    <Link
                      to={getPathWithLanguage(
                        "/selling-product",
                        currentLanguage
                      )}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("selling_product")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      {t("navbar:logout")}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Language Dropdown */}
            <div className="relative dropdown">
              <button
                onClick={toggleLanguageDropdown}
                className="flex items-center hover:text-[#C02244] focus:outline-none"
              >
                <span className="mr-1 text-l sm:text-xl md:text-3xl">
                  {
                    languages.find((lang) => lang.code === currentLanguage)
                      ?.icon
                  }
                </span>
                <IoMdArrowDropdown className="text-2xl" />
              </button>
              {languageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left flex items-center"
                    >
                      <span className="mr-2">{lang.icon}</span>
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <Link
              to={getPathWithLanguage("/categories", currentLanguage)}
              className="block text-gray-700 hover:text-gray-900"
            >
              {t("navbar:categories")}
            </Link>
            <Link
              to={getPathWithLanguage("/search", currentLanguage)}
              className="block text-gray-700 hover:text-gray-900"
            >
              {t("navbar:search")}
            </Link>
            <Link
              to={getPathWithLanguage("/browse", currentLanguage)}
              className="block text-gray-700 hover:text-gray-900"
            >
              {t("navbar:browse_products")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
