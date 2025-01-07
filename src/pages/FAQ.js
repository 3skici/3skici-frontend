import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    { question: t("what_is_3skici"), answer: t("what_is_3skici_text") },
    { question: t("how_does_3skici_work"), answer: t("how_does_3skici_work_text") },
    { question: t("is_3skici_free"), answer: t("is_3skici_free_text") },
    { question: t("how_to_list_item"), answer: t("how_to_list_item_text") },
    { question: t("do_i_need_account"), answer: t("do_i_need_account_text") },
    { question: t("return_policy"), answer: t("return_policy_text") },
    { question: t("delivery_service"), answer: t("delivery_service_text") },
    { question: t("report_fake_products"), answer: t("report_fake_products_text") },
  ];

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          {t("faq_title")}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow rounded-lg">
              <button
                className="w-full flex justify-between items-center p-5 text-left text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${
                    activeIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="px-5 pb-5 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
