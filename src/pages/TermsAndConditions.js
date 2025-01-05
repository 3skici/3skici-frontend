import React from 'react';
import { useTranslation } from 'react-i18next';

const TermsAndConditions = () => {
  // calling translation files
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">{t("terms_and_conditions")}</h1>
      <p className="text-gray-700 mb-6">
        By using the 3skici platform, you agree to comply with these Terms and Conditions. Please read them carefully before registering or posting products on the platform.
      </p>

      {/* General Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. General Terms</h2>
        <p className="text-gray-700">
          3skici is a second-hand marketplace that connects buyers and sellers. You agree to use the platform responsibly and in compliance with all applicable laws. By using the platform, you agree to act in good faith, respect other users, and refrain from any activity that could harm the integrity of the marketplace.
        </p>
      </section>

      {/* Account Registration Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Account Registration Terms</h2>
        <p className="text-gray-700">
          To access certain features of 3skici, such as posting products or managing your account, you must create an account. By registering, you agree to:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Provide accurate, current, and complete information during registration.</li>
          <li>Keep your login credentials confidential and notify 3skici immediately of any unauthorized use of your account.</li>
          <li>Be at least 18 years old, or have the consent of a parent or guardian to use the platform.</li>
          <li>Comply with all applicable laws when using the platform.</li>
        </ul>
      </section>

      {/* Product Listing Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Product Listing Terms</h2>
        <p className="text-gray-700">
          If you wish to sell products on 3skici, you agree to:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Provide accurate and truthful descriptions of the items you are listing.</li>
          <li>Only list products that you legally own or have the right to sell.</li>
          <li>Ensure that your product listings do not violate any local or international laws, including those regarding counterfeit goods, prohibited items, or unsafe products.</li>
          <li>Upload clear images that represent the condition and appearance of the products being sold.</li>
          <li>Refrain from listing products that could be considered illegal, hazardous, or offensive.</li>
        </ul>
      </section>

      {/* Transaction Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Transaction Terms</h2>
        <p className="text-gray-700">
          Transactions on 3skici are between the buyer and seller directly. You agree to:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Negotiate and finalize all terms of the transaction between yourself and the other party.</li>
          <li>Ensure that payments and product deliveries are conducted in good faith and in compliance with any agreements made.</li>
        </ul>
      </section>

      {/* Privacy and Security */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Privacy and Security</h2>
        <p className="text-gray-700">
          We are committed to protecting your privacy. Please refer to our Privacy Policy for information on how we collect, use, and protect your data.
        </p>
      </section>

      {/* Moderation and Reporting */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">6. Moderation and Reporting</h2>
        <p className="text-gray-700">
          3skici implements a reporting system for inappropriate content or behavior. You agree to:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Report any suspicious or inappropriate listings through the platform’s reporting system.</li>
          <li>Not engage in fraudulent activities, including posting fake products or providing false information.</li>
        </ul>
      </section>

      {/* Sustainability and Environmental Responsibility */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">7. Sustainability and Environmental Responsibility</h2>
        <p className="text-gray-700">
          By using 3skici, you acknowledge the importance of sustainability and eco-conscious consumption. You agree to:
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Engage in responsible reuse and recycling by listing only quality pre-owned items.</li>
          <li>Support the circular economy by choosing to purchase second-hand items instead of new products whenever possible.</li>
        </ul>
      </section>

      {/* Dispute Resolution */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">8. Dispute Resolution</h2>
        <p className="text-gray-700">
          Any disputes arising between buyers and sellers on 3skici should be resolved directly. 3skici is not responsible for any issues related to transactions, product disputes, or delivery problems. We recommend using trusted payment and shipping methods to ensure a secure transaction.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">9. Limitation of Liability</h2>
        <p className="text-gray-700">
          3skici is not liable for any damages, losses, or issues arising from the use of the platform, including issues with product listings, transactions, or communication between buyers and sellers.
        </p>
      </section>

      {/* Final Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">10. Final Terms</h2>
        <p className="text-gray-700">
          These Terms and Conditions may be updated periodically. It is your responsibility to review these terms regularly to stay informed of any changes.
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
