import React from 'react';

const AboutUs = () => {
  return (
    <div className="bg-gray-100 py-12 px-6 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Welcome to <span className="text-blue-500">3skici</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            The platform dedicated to connecting sellers and buyers of second-hand products seamlessly. Join us for a completely free, simple, and transparent way to buy and sell pre-loved items.
          </p>
        </header>

        {/* Mission Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="mt-4 text-gray-700">
            At 3skici, our mission is to empower people to make smarter, more sustainable buying decisions by connecting them with others who have what they need. We aim to simplify the process of buying and selling second-hand goods, creating an accessible and enjoyable experience for everyone.
          </p>
        </section>

        {/* How It Works Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800">How It Works</h2>
          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* For Sellers */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">For Sellers</h3>
              <p className="mt-2 text-gray-600">
                Listing items is easy and completely free. Register, log in, and create your listing with clear descriptions and images. It’s that simple!
              </p>
            </div>
            {/* For Buyers */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">For Buyers</h3>
              <p className="mt-2 text-gray-600">
                Browse items freely, contact sellers directly, and make informed purchases. No account required for browsing or buying!
              </p>
            </div>
            {/* Transaction Process */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-800">Transaction Process</h3>
              <p className="mt-2 text-gray-600">
                Transactions are handled directly between buyers and sellers. Clear communication and verification are key to a successful purchase.
              </p>
            </div>
          </div>
        </section>

        {/* Our Unique Features Section */}
        <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Our Unique Features</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start space-x-4">
              <span className="text-blue-500 text-xl">✔</span>
              <p className="text-gray-700">Completely Free for Sellers and Buyers: No fees, no hidden charges. Everything is transparent and cost-free.</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-blue-500 text-xl">✔</span>
              <p className="text-gray-700">Direct Communication: Buyers can contact sellers directly through the product listings for smooth transactions.</p>
            </div>
            <div className="flex items-start space-x-4">
              <span className="text-blue-500 text-xl">✔</span>
              <p className="text-gray-700">Simple & Accessible: No account required for browsing and buying. Registration is only needed for selling and reporting issues.</p>
            </div>
          </div>
        </section>

        {/* Returns Policy Section */}
        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Returns Policy</h2>
          <p className="mt-4 text-gray-700">
            Please note that there is no return policy on 3skici. Transactions are made directly between buyers and sellers. We encourage users to communicate clearly before completing any purchase.
          </p>
        </section>

        {/* Delivery Service Section */}
        <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Delivery Service (Coming Soon!)</h2>
          <p className="mt-4 text-gray-700">
            We’re working on developing a delivery service to make the buying process even more convenient for you. Stay tuned as we roll out this feature in the near future!
          </p>
        </section>

        {/* 3skici in Numbers Section */}
        <section className="mb-16 bg-white shadow rounded-lg p-8 border-l-4 border-orange-500">
          <h2 className="text-3xl font-bold text-orange-600 mb-4 flex items-center">
            <span className="material-icons mr-2">
            3skici numbers
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">1,999</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">567</h3>
              <p className="text-gray-600">Items for Sale</p>
            </div>
            <div className="bg-gray-50 shadow-inner rounded-lg p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-800">890</h3>
              <p className="text-gray-600">Successful Transactions</p>
            </div>
          </div>
        </section>

        {/* Report Fake or Inappropriate Products Section */}
        <section className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Report Fake or Inappropriate Products</h2>
          <p className="mt-4 text-gray-700">
            If you come across a product that seems fake or inappropriate, you can easily report it. Our team will review your report and take necessary actions to maintain a safe and trustworthy environment for all users.
          </p>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-12">
          <h2 className="text-3xl font-semibold text-gray-800">Join the 3skici Community</h2>
          <p className="mt-4 text-lg text-gray-600">Ready to buy or sell with purpose? Get started now and be part of the change.</p>
          <div className="mt-6">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition">Start Shopping</button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
