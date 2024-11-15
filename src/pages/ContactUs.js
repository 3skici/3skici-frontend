import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Form</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" id="name" name="name" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" name="subject" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea id="message" name="message" rows="4" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" required />
              </div>
              <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Send Message
              </button>
            </form>
          </div>

          {/* Support Info */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Support Information</h2>
            <p className="text-gray-700 mb-4">
              For any inquiries, please reach out to our customer support team. We're here to help!
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600"><strong>Email:</strong> support@3skici.com</p>
              <p className="text-sm text-gray-600"><strong>Phone:</strong> +1 (800) 123-4567</p>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mt-6">Response Time</h3>
            <p className="text-gray-700">We typically respond within 1-2 business days.</p>

            {/* Social Media Links */}
            <div className="mt-6 flex space-x-4">
              <a href="https://facebook.com/3skici" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com/3skici" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com/3skici" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
