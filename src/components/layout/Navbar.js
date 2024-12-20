import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import { BsChatDots } from "react-icons/bs"; // Importing chat icon
import i18n from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer for notifications
import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS
const Navbar = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const token = useSelector((state) => state.auth.token);
  // Modify path to include the language prefix
  const getPathWithLanguage = (path, langCode) => {
    let segments = path.split("/");
    if (["en", "ar", "tr"].includes(segments[1])) {
      segments[1] = langCode; // Replace current language
    } else {
      segments.splice(1, 0, langCode); // Add the current language prefix
    }
    return segments.join("/");
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

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
    setProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
    setLanguageDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate(`/${currentLanguage}/login`);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown")) {
      setLanguageDropdownOpen(false);
      setProfileDropdown(false);
    }
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

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    navigate(getPathWithLanguage("/fav", currentLanguage)); // Navigate to the favorites page
  };

  // Handle selling product link click
  const handleSellingProductClick = (e) => {
    if (!token) {
      e.preventDefault();
      // If no token is present
      toast.error("You need to log in to sell a product.");
    } else {
      navigate(getPathWithLanguage("/selling-product", currentLanguage)); // Otherwise, navigate to selling-product page
    }
  };

  return (
    <nav className="bg-gray-900 text-white p-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={getPathWithLanguage("/", currentLanguage)}
          className="text-2xl font-bold hover:text-yellow-400"
        >
          3skici
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div
          className={`flex-col lg:flex-row lg:flex items-center space-x-6 ${
            mobileMenuOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          <Link
            to={getPathWithLanguage("/selling-product", currentLanguage)}
            onClick={handleSellingProductClick} // Attach the handler here
            className="hover:text-yellow-400 py-2 lg:py-0"
          >
            {t("sell_product")}
          </Link>

          <div className="flex items-center space-x-8">
            {isLoggedIn && (
              <>
                <Link
                  to={getPathWithLanguage("/chat", currentLanguage)}
                  className="text-xl text-white hover:text-yellow-400 focus:outline-none"
                >
                  <BsChatDots />
                </Link>
                <button
                  className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                  aria-label="show notifications"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={toggleFavorite}
                  className={`text-xl ${
                    isFavorite ? "text-red-500" : "text-white"
                  } hover:text-red-400 focus:outline-none`}
                >
                  <FaHeart />
                </button>
              </>
            )}
            {isLoggedIn ? (
              <div className="relative py-2 lg:py-0 dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center hover:text-yellow-400 focus:outline-none"
                  aria-expanded={profileDropdown}
                  aria-haspopup="true"
                >
                  <FaUserCircle className="mr-1 text-xl" />
                  <IoMdArrowDropdown className="text-xl" />
                </button>

                {profileDropdown && (
                  <div className="absolute z-50 right-8 mt-1  mt-6 w-56 max-w-screen bg-white text-black rounded-md shadow-lg transition-all ease-in-out duration-300 border border-gray-200">
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
                        {/* {t("user_dashboard")} */}
                        Notifications
                      </Link>

                      {/* Manage Products Link */}
                      <Link
                        to={getPathWithLanguage(
                          "/product-management",
                          currentLanguage
                        )}
                        className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full text-left flex items-center`}
                      >
                        {t("manage_products")}
                      </Link>

                      {/* Settings Link */}
                      <Link
                        to={getPathWithLanguage(
                          "/user-settings",
                          currentLanguage
                        )}
                        className={`block px-6 py-3 hover:bg-gray-100 transition-all duration-200 w-full text-left flex items-center`}
                      >
                        {t("settings")}
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
                className="px-4 py-2 hover:bg-gray-700 rounded flex items-center lg:py-0"
              >
                <FiLogIn className="mr-1" /> {t("navbar:login")}
              </Link>
            )}
          </div>
          {/* Language Switcher Dropdown */}
          <div className="relative py-2 lg:py-0 dropdown">
            <button
              onClick={toggleLanguageDropdown}
              className="flex items-center hover:text-yellow-400 focus:outline-none"
            >
              <span className="mr-1">
                {languages.find((lang) => lang.code === currentLanguage)?.icon}
              </span>
              <IoMdArrowDropdown />
            </button>
            {languageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 text-black rounded-md shadow-lg">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="block px-4 py-2 hover:bg-gray-200 dark:text-white w-full text-left flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
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
      {/* ToastContainer to display toast notifications */}
      <ToastContainer />
    </nav>
  );
};

export default Navbar;
