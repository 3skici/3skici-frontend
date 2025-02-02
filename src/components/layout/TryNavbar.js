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
import "react-toastify/dist/ReactToastify.css";
const TryNavbar = () => {
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
    <nav
      dir="ltr"
      className="h-[56px] sm:h-[64px] md:h-[80px] lg:h-[100px] xl:h-[120px] bg-gray-50 text-dark-purple-blue p-8 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to={getPathWithLanguage("/", currentLanguage)}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl   text-[#C02244] font-bold hover:text-[#C02244]"
        >
          <span>3</span>
          <span>skici</span>
        </Link>
        <div className="lg:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-2xl sm:text-3xl md:text-4xl focus:outline-none"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div
          className={`flex-col lg:flex-row lg:flex items-center space-x-6 ${
            mobileMenuOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          <div className="rounded p-3">
            <Link
              to={getPathWithLanguage("/selling-product", currentLanguage)}
              onClick={handleSellingProductClick} // Attach the handler here
              className=" font-nunito  text-l font-semibold px-4 py-2 border rounded hover:bg-gray-100"
            >
              {t("sell_product")}
            </Link>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-8">
            {isLoggedIn && (
              <>
                <Link
                  to={getPathWithLanguage("/chat", currentLanguage)}
                  className="text-2xl sm:text-3xl text-dark-purple-blue hover:text-red-300 focus:outline-none"
                >
                  <BsChatDots />
                </Link>

                <button
                  onClick={toggleFavorite}
                  className={`text-2xl sm:text-3xl ${
                    isFavorite ? "text-[#C02244]" : "text-[#C02244]"
                  } hover:text-[#e08599] focus:outline-none`}
                >
                  <FaHeart />
                </button>
              </>
            )}
            {isLoggedIn ? (
              <div className="relative py-2 lg:py-0 dropdown">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center text-lg sm:text-xl hover:text-[#803e4c] focus:outline-none"
                  aria-expanded={profileDropdown}
                  aria-haspopup="true"
                >
                  <FaUserCircle className="mr-1 text-xl sm:text-2xl" />
                  <IoMdArrowDropdown className="text-xl sm:text-2xl" />
                </button>

                {profileDropdown && (
                  <div className="absolute z-50 right-8  mt-6 w-56 max-w-screen bg-white text-black rounded-md shadow-lg transition-all ease-in-out duration-300 border border-gray-200">
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
                className="px-4 py-2 border rounded hover:bg-gray-100 flex items-center text-lg sm:text-xl"
              >
                <FiLogIn className="mr-1" /> {t("navbar:login")}
              </Link>
            )}
          </div>
          {/* Language Switcher Dropdown */}
          <div className="relative dropdown">
            <button
              onClick={toggleLanguageDropdown}
              className="flex items-center hover:text-[#C02244] focus:outline-none"
            >
              <span className="mr-1 text-l sm:text-xl md:text-3xl">
                {languages.find((lang) => lang.code === currentLanguage)?.icon}
              </span>
              <IoMdArrowDropdown className="text-2xl" />
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

export default TryNavbar;
