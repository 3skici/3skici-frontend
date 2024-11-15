// // LanguageLayout.jsx
// import React from "react";
// import { Outlet, useParams, Navigate } from "react-router-dom";
// import i18n from 'i18next';

// const supportedLanguages = ['en', 'ar', 'tr'];

// const LanguageLayout = () => {
//   const { lang } = useParams();

//   // Redirect to default language if unsupported
//   if (!supportedLanguages.includes(lang)) {
//     return <Navigate to="/en" replace />;
//   }

//   // Change language in i18n
//   if (i18n.language !== lang) {
//     i18n.changeLanguage(lang);
//   }

//   return <Outlet />;
// };

// export default LanguageLayout;
