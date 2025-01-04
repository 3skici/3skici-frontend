import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import translationEN from "./locales/en/translation.json";
import translationAR from "./locales/ar/translation.json";
import translationTR from "./locales/tr/translation.json";

// Import modular translation files
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enNavbar from "./locales/en/navbar.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import enAuth from "./locales/en/auth.json";
import enPrivacy from "./locales/en/privacy_policy.json";

import arCommon from "./locales/ar/common.json";
import arHome from "./locales/ar/home.json";
import arNavbar from "./locales/ar/navbar.json";
import arAbout from "./locales/ar/about.json";
import arContact from "./locales/ar/contact.json";
import arAuth from "./locales/ar/auth.json";
import arPrivacy from "./locales/ar/privacy_policy.json";

import trCommon from "./locales/tr/common.json";
import trHome from "./locales/tr/home.json";
import trNavbar from "./locales/tr/navbar.json";
import trAbout from "./locales/tr/about.json";
import trContact from "./locales/tr/contact.json";
import trAuth from "./locales/tr/auth.json";
import trPrivacy from "./locales/tr/privacy_policy.json";

// Extend LanguageDetector with the custom path detector
const CustomPathLanguageDetector = new LanguageDetector();

// Custom language detector to detect language from URL path
CustomPathLanguageDetector.addDetector({
  name: "pathLanguageDetector",
  lookup() {
    const pathParts = window.location.pathname.split("/");
    if (["en", "ar", "tr"].includes(pathParts[1])) {
      return pathParts[1];
    }
    return null;
  },
});

// handle rtl
const setHtmlDirection = (lng) => {
  const dir = lng === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lng);
};

// Initialize i18n
i18n
  .use(CustomPathLanguageDetector) // Register custom language detector
  .use(initReactI18next) // Pass i18n to React
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["pathLanguageDetector", "localStorage", "navigator"],
      caches: ["localStorage"],
      lookupFromPathIndex: 0,
    },
    fallbackLng: "en",
    resources: {
      en: {
        translation: {
          ...translationEN,
          ...enCommon,
          ...enHome,
          ...enNavbar,
          ...enAbout,
          ...enContact,
          ...enAuth,
          ...enPrivacy,
        },
      },
      ar: {
        translation: {
          ...translationAR,
          ...arCommon,
          ...arHome,
          ...arNavbar,
          ...arAbout,
          ...arContact,
          ...arAuth,
          ...arPrivacy,
        },
      },
      tr: {
        translation: {
          ...translationTR,
          ...trCommon,
          ...trHome,
          ...trNavbar,
          ...trAbout,
          ...trContact,
          ...trAuth,
          ...trPrivacy,
        },
      },
    },
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  })
  .then(() => setHtmlDirection(i18n.language));

i18n.on("languageChanged", setHtmlDirection);

export default i18n;
