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
  const handleLogout = () => dispatch(logout());

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

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
    <nav dir="ltr" className="bg-gray-50 shadow-md">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 sm:hidden">
            <Link
              to={getPathWithLanguage("/categories", currentLanguage)}
              className="text-gray-700 hover:text-fiery-red text-base md:text-lg lg:text-xl leading-relaxed py-2 lg:py-0"
            >
              {t("categories")}
            </Link>

            <Link
              to={getPathWithLanguage("/selling-product", currentLanguage)}
              className="hover:text-fiery-red py-2 lg:py-0 text-base md:text-lg lg:text-xl leading-relaxed"
            >
              {t("selling_product")}
            </Link>

            <Link
              to={getPathWithLanguage("/browse-products", currentLanguage)}
              className="text-gray-700 hover:text-fiery-red text-base md:text-lg lg:text-xl leading-relaxed py-2 lg:py-0"
            >
              {t("browse_products")}
            </Link>
          </div>

          {/* Profile and Language Section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-lg sm:text-xl hover:text-[#803e4c] focus:outline-none"
                  aria-expanded={profileDropdown}
                  aria-haspopup="true"
                >
                  <img
                    src={getImageUrl(user?.avatar)}
                    alt="Profile"
                    className="w-10 h-10 rounded-full ring-1"
                  />
                </button>
                {profileDropdown && (
                  <div className="absolute z-50 right-8   mt-6 w-56 max-w-screen bg-white text-black rounded-md shadow-lg transition-all ease-in-out duration-300 border border-gray-200">
                    <div className="overflow-auto max-h-60">
                      {/* Profile Link */}
                      <Link
                        to={getPathWithLanguage("/profile", currentLanguage)}
                        className="block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full flex  items-center"
                      >
                        {t("profile")}
                      </Link>

                      {/* User Dashboard Link */}
                      <Link
                        to={getPathWithLanguage(
                          "/notifications",
                          currentLanguage
                        )}
                        className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full text-left flex items-center`}
                      >
                        {t("notifications")}
                      </Link>

                      {/* chatting Link */}
                      <Link
                        to={getPathWithLanguage("/chat", currentLanguage)}
                        className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full text-left flex items-center`}
                      >
                        {t("chat")}
                      </Link>

                      {/* selling product*/}
                      <Link
                        to={getPathWithLanguage(
                          "/selling-product",
                          currentLanguage
                        )}
                        className="block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full flex  items-center"
                      >
                        {t("selling_product")}
                      </Link>

                      {/* Logout Button */}
                      <button
                        onClick={handleLogout}
                        className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full text-left flex items-center`}
                      >
                        {t("logout")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={getPathWithLanguage("/login", currentLanguage)}
                className="bg-fiery-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                {t("navbar:login")}
              </Link>
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
    </nav>
  );
};

export default Navbar;
