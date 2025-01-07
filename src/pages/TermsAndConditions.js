import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">{t("terms_and_conditions")}</h1>
      <p className="text-gray-700 mb-6">{t("terms_intro")}</p>

      {/* General Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("general_terms")}</h2>
        <p className="text-gray-700">{t("general_terms_text")}</p>
      </section>

      {/* Account Registration Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("account_registration")}</h2>
        <p className="text-gray-700">{t("account_registration_text")}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {t("account_registration_points", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Product Listing Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("product_listing")}</h2>
        <p className="text-gray-700">{t("product_listing_text")}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {t("product_listing_points", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Transaction Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("transaction_terms")}</h2>
        <p className="text-gray-700">{t("transaction_terms_text")}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {t("transaction_terms_points", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Privacy and Security */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("privacy_security")}</h2>
        <p className="text-gray-700">{t("privacy_security_text")}</p>
      </section>

      {/* Moderation and Reporting */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("moderation_reporting")}</h2>
        <p className="text-gray-700">{t("moderation_reporting_text")}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {t("moderation_reporting_points", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Sustainability and Environmental Responsibility */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("sustainabiility")}</h2>
        <p className="text-gray-700">{t("sustainability_text")}</p>
        <ul className="list-disc pl-5 text-gray-700">
          {t("sustainability_points", { returnObjects: true }).map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </section>

      {/* Dispute Resolution */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("dispute_resolution")}</h2>
        <p className="text-gray-700">{t("dispute_resolution_text")}</p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("limitation_liability")}</h2>
        <p className="text-gray-700">{t("limitation_liability_text")}</p>
      </section>

      {/* Final Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{t("final_terms")}</h2>
        <p className="text-gray-700">{t("final_terms_text")}</p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
