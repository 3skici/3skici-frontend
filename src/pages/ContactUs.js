import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const ContactUsForm = () => {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [messageType, setMessageType] = useState('Inquiry');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare the data to be sent
    const data = {
      name: isAnonymous ? '' : name,
      email: isAnonymous ? '' : email,
      messageContent,
      isAnonymous,
      messageType,
    };

    try {
      // Send POST request to backend
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Handle response
      if (response.ok) {
        const result = await response.json();
        setResponseMessage(result.message);
        // Clear the form after successful submission
        setName('');
        setEmail('');
        setMessageContent('');
        setIsAnonymous(false);
        setMessageType('Inquiry');
      } else {
        const errorResult = await response.json();
        setResponseMessage(errorResult.error || t('response_error'));
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      setResponseMessage(t('response_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Side - Image or Illustration */}
      <div className="lg:w-1/2 bg-indigo-600 flex items-center justify-center p-10">
        <div className="text-center">
          <h2 className="text-white text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-white text-lg mb-8">{t('description')}</p>
          <img src="/path-to-your-image.jpg" alt="Contact Us" className="mx-auto hidden lg:block" />
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div className="lg:w-1/2 bg-white flex items-center justify-center p-10">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">{t('contact_form_title')}</h2>
          {responseMessage && (
            <p className="mb-4 p-3 bg-green-100 text-green-800 rounded">{responseMessage}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isAnonymous && (
              <>
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                    {t('name_label')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    placeholder={t('name_label')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    {t('email_label')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (!emailRegex.test(e.target.value)) {
                        setResponseMessage(t('invalid_email'));
                      } else {
                        setResponseMessage('');
                      }
                    }}
                    autoComplete="email"
                    className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    placeholder={t('email_label')}
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label htmlFor="messageType" className="block text-sm font-semibold text-gray-700">
                {t('message_type_label')}
              </label>
              <select
                id="messageType"
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              >
                <option value="Inquiry">{t('message_type_options.inquiry')}</option>
                <option value="Report">{t('message_type_options.report')}</option>
                <option value="Feedback">{t('message_type_options.feedback')}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="messageContent" className="block text-sm font-semibold text-gray-700">
                {t('message_label')}
              </label>
              <textarea
                id="messageContent"
                aria-label="Message content"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                required
                className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                placeholder={t('message_placeholder')}
                rows="5"
              ></textarea>
            </div>
            <div className="form-group flex items-center">
              <input
                type="checkbox"
                id="isAnonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                tabIndex="0"
              />
              <label htmlFor="isAnonymous" className="ml-2 block text-sm text-gray-700">
                {t('send_anonymously_label')}
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 transition duration-300"
              disabled={loading}
            >
              {loading ? t('sending_button') : t('submit_button')}
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-gray-600">{t('social_media_text')}</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                <FaFacebookF size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsForm;
