import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        <p className="mt-2 text-lg">Last Updated: November 2024</p>
      </header>

      {/* Content Section */}
      <main className="max-w-4xl mx-auto p-6 text-gray-800">
        {/* Introduction */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Welcome to 3skici</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms and Conditions govern your use of the 3skici platform.
            By accessing or using our services, you agree to these terms. Please
            read them carefully.
          </p>
        </section>

        {/* Platform Usage Guidelines */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">1. Platform Usage Guidelines</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>All users must use the platform responsibly and lawfully.</li>
            <li>Posting illegal, restricted, or prohibited items is not allowed.</li>
            <li>
              Engaging in fraud, spamming, or harassment will result in account
              suspension.
            </li>
            <li>Sellers must provide accurate and truthful information.</li>
          </ul>
        </section>

        {/* User Conduct */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">2. User Conduct</h3>
          <p className="text-gray-600 leading-relaxed">
            Users are required to communicate respectfully and maintain
            professional conduct while using the platform. Misconduct, such as
            abusive language or fraudulent activity, will not be tolerated and
            may lead to account suspension.
          </p>
        </section>

        {/* Liability Disclaimer */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">3. Liability Disclaimer</h3>
          <p className="text-gray-600 leading-relaxed">
            3skici acts as a platform to connect buyers and sellers and is not
            responsible for the accuracy of listings or any disputes that arise
            between users. We disclaim liability for any loss or damage
            resulting from platform usage.
          </p>
        </section>

        {/* Intellectual Property */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">4. Intellectual Property</h3>
          <p className="text-gray-600 leading-relaxed">
            All trademarks, logos, and content are the property of 3skici or
            respective users. Users are responsible for ensuring that their
            content does not infringe the rights of others.
          </p>
        </section>

        {/* Amendment Clause */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">5. Amendment Clause</h3>
          <p className="text-gray-600 leading-relaxed">
            3skici reserves the right to modify these terms at any time without
            prior notice. Continued use of the platform signifies your
            acceptance of the updated terms.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4 text-sm text-gray-600">
        &copy; 2024 3skici. All rights reserved.
      </footer>
    </div>
  );
};

export default TermsAndConditions;
