import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiLogIn } from "react-icons/fi";
import i18n from "i18next";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

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

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
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
            className="hover:text-yellow-400 py-2 lg:py-0"
          >
            {t("sell_product")}
          </Link>
          <Link
            to={getPathWithLanguage("/about", currentLanguage)}
            className="hover:text-yellow-400 py-2 lg:py-0"
          >
            {t("about_us_nav")}
          </Link>
          <Link
            to={getPathWithLanguage("/cat", currentLanguage)}
            className="hover:text-yellow-400 py-2 lg:py-0"
          >
            {t("categories")}
          </Link>
          <Link
            to={getPathWithLanguage("/products", currentLanguage)}
            className="hover:text-yellow-400 flex items-center py-2 lg:py-0"
          >
            {t("manage_products")}
          </Link>
          <div className="flex items-center space-x-4">
            {isLoggedIn && (
              <button
                onClick={toggleFavorite}
                className={`text-xl ${
                  isFavorite ? "text-red-500" : "text-white"
                } hover:text-red-400 focus:outline-none`}
              >
                <FaHeart />
              </button>
            )}
            {isLoggedIn ? (
              <div className="relative py-2 lg:py-0 dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center hover:text-yellow-400 focus:outline-none"
                >
                  <FaUserCircle className="mr-1" />
                  <IoMdArrowDropdown />
                </button>
                {profileDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
                    <Link
                      to={getPathWithLanguage("/profile", currentLanguage)}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left flex items-center"
                    >
                      {t("navbar:profile")}
                    </Link>
                    <Link
                      to={getPathWithLanguage("/user-dashboard", currentLanguage)}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left flex items-center"
                    >
                      User Dashboard
                    </Link>
                    <Link
                      to={getPathWithLanguage(
                        "/user-settings",
                        currentLanguage
                      )}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left flex items-center"
                    >
                      {t("navbar:settings")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-200 w-full text-left flex items-center"
                    >
                      {t("navbar:logout")}
                    </button>
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
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-md shadow-lg">
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
    </nav>
  );
};

export default Navbar;
