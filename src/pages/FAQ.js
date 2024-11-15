// src/components/FAQ.jsx

import React, { useState } from 'react';

const faqs = [
  {
    question: "What is 3skici?",
    answer:
      "3skici is a platform dedicated to connecting sellers and buyers of second-hand products seamlessly. We offer a completely free experience for both parties, making buying and selling second-hand items easier and more accessible for everyone.",
  },
  {
    question: "How does 3skici work?",
    answer:
      "Sellers can register and log in to list their items with detailed descriptions and images. Buyers can browse and purchase products without creating an account. Once a buyer finds an item, they can directly connect with the seller to finalize the transaction.",
  },
  {
    question: "Is 3skici free to use?",
    answer:
      "Yes, 3skici is completely free for both sellers and buyers. There are no fees or hidden charges for listing items or making purchases on our platform.",
  },
  {
    question: "How do I list an item for sale?",
    answer:
      "Simply register for an account, log in, and navigate to the 'Sell' section. From there, you can upload images, add descriptions, and set the price for your item.",
  },
  {
    question: "Do I need an account to buy items?",
    answer:
      "No, buyers can browse and purchase products without creating an account. However, having an account allows you to track your purchases and communicate more effectively with sellers.",
  },
  {
    question: "What is the return policy?",
    answer:
      "Please note that there is no return policy on 3skici. Our platform connects buyers and sellers directly, and we do not take responsibility for the condition or authenticity of the products. We advise all users to communicate clearly and verify items before purchasing.",
  },
  {
    question: "Does 3skici offer a delivery service?",
    answer:
      "We are currently developing a delivery service to make the buying process even more convenient for our users. Stay tuned for upcoming features that will include specialized delivery options.",
  },
  {
    question: "How can I report fake or inappropriate products?",
    answer:
      "If you encounter any product that seems fake or inappropriate, you can easily report it using the 'Report' button on the product page. Our dedicated team will review your report and take necessary actions to ensure the integrity of the marketplace.",
  },
  {
    question: "How is 3skici different from other second-hand marketplaces?",
    answer:
      "Unlike other platforms, 3skici offers a completely free experience for both sellers and buyers. We focus on providing a safe and organized marketplace with detailed product listings and direct communication between users.",
  },
  {
    question: "What are the benefits of using 3skici?",
    answer:
      "3skici provides a fee-free platform for buying and selling second-hand items, detailed product descriptions and images, direct communication between buyers and sellers, and a growing community with real-time statistics showcasing our marketplace's vibrancy.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white shadow rounded-lg">
              <button
                className="w-full flex justify-between items-center p-5 text-left text-gray-800 focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
