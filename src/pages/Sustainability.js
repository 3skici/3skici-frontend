import React from "react";
import { useTranslation } from "react-i18next";

const Sustainability = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        {t("sustainability_at_3skici")}
      </h1>
      <p className="mb-4 text-gray-700">
        {t("commitment_statement")} 
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        {t("why_sustainability_matters")}
      </h2>
      <p className="mb-6 text-gray-700">
        {t("why_sustainability_matters_description")}
      </p>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        {t("how_3skici_promotes_sustainability")}
      </h2>
      <ul className="list-disc list-inside mb-6 text-gray-700">
        <li>
          <strong>{t("extending_product_lifecycles")}</strong>: {t("extending_product_lifecycles_description")}
        </li>
        <li>
          <strong>{t("reducing_waste")}</strong>: {t("reducing_waste_description")}
        </li>
        <li>
          <strong>{t("fostering_circular_economy")}</strong>: {t("fostering_circular_economy_description")}
        </li>
        <li>
          <strong>{t("empowering_eco_conscious_decisions")}</strong>: {t("empowering_eco_conscious_decisions_description")}
        </li>
      </ul>
      
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
        {t("join_us_in_making_a_difference")}
      </h2>
      <p className="mb-6 text-gray-700">
        {t("join_us_description")}
      </p>
      
      <p className="mb-6 text-gray-700">
        {t("thank_you_for_joining")}
      </p>
    </div>
  );
};

export default Sustainability;
