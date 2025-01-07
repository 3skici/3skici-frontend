import React from "react";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              {t("privacy_policy")}
            </h1>
          </div>
          <section className="mb-8">
            <div className="flex flex-row-reverse items-center justify-between space-x-4 dark:text-gray-600 mb-4">
              <span className="inline-flex items-center px-3 py-1 my-1 space-x-2 text-sm border rounded-full group dark:border-gray-300">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full dark:bg-green-600"
                ></span>
                <span className="group-hover:underline dark:text-gray-800">
                  {t("effective_date")}
                </span>
                <span className="text-s whitespace-nowrap">
                  {t("date")}
                </span>
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 leading-relaxed">
                {t("privacy_intro")}
              </p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded flex items-center mb-8">
              <span className="w-8 h-8 flex items-center justify-center bg-yellow-500 text-white rounded-full font-bold text-2xl m-1">
                !
              </span>
              <p className="text-blue-700">{t("privacy_agreement")}</p>
            </div>

            <div className="mb-4 py-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t("information_we_collect")}
              </h2>
              <div className="mt-4 space-y-2">
                {[
                  "personal_information",
                  "transaction_information",
                  "usage_data",
                  "cookies"
                ].map((category, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{t(category)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("how_we_use_information")}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <ul className="space-y-4">
                {[
                  "provide_improve_services",
                  "facilitate_communication",
                  "marketing_purposes",
                  "ensure_compliance"
                ].map((purpose, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-gray-600">{t(purpose)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("how_we_protect_information")}
            </h2>
            <div className="prose text-gray-600">
              <p className="mb-4">{t("data_security_text")}</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("your_rights_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "access_rights",
                "rectification_rights",
                "erasure_rights",
                "portability_rights"
              ].map((right, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">
                    {t(`${right}_title`)}
                  </h3>
                  <p className="text-gray-600">{t(`${right}_text`)}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {t("contact_us_title")}
            </h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center space-x-2 text-blue-600">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a href="mailto:privacy@example.com" className="hover:underline">
                  {t("contact_email")}
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
