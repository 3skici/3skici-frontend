import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAuthValidation from "../hooks/useAuthValidation";

const Footer = () => {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const { validateLogin } = useAuthValidation();
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

  return (
    <footer className="bg-[#7e193e] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3skici Section */}
          <div className="text-center md:text-left">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">3skici</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to={about}
                  className="hover:text-red-300 transition duration-200 block"
                >
                  {t("about_us_nav")}
                </Link>
              </li>
              <li>
                <Link
                  to={sitemap}
                  className="hover:text-red-300 transition duration-200 block"
                >
                  {t("sitemap")}
                </Link>
              </li>
              <li>
                <Link
                  to={sustainability}
                  className="hover:text-red-300 transition duration-200 block"
                >
                  {t("sustainability")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div className="text-center md:text-left">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">
              {t("help_and_support")}
            </h3>
            <ul className="space-y-3">
              {[privacy, terms, faq, contact].map((path, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    className="hover:text-red-300 transition duration-200 block"
                  >
                    {t(
                      [
                        "privacy_policy",
                        "terms_and_conditions",
                        "faq",
                        "contact_us_text",
                      ][index]
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg lg:text-xl font-semibold mb-4">
              {t("quick_links")}
            </h3>
            <ul className="space-y-3">
              {["/selling-product", "/categories", "/filter", "/report"].map(
                (path, index) => (
                  <li key={index}>
                    {path === "/report" && !isLoggedIn ? (
                      <button
                        onClick={(e) => validateLogin(e, "report product")}
                        className="hover:text-red-300 transition duration-200 w-full"
                      >
                        {t("report_product")}
                      </button>
                    ) : (
                      <Link
                        to={getPathWithLanguage(path, currentLanguage)}
                        className="hover:text-red-300 transition duration-200 block"
                      >
                        {t(
                          [
                            "selling_product",
                            "categories",
                            "advance_search",
                            "report_product",
                          ][index]
                        )}
                      </Link>
                    )}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm md:text-base">
          &copy; {new Date().getFullYear()} {t("copyright_notice")}.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
