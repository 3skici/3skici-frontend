import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/images/shopping.jpg";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ReactComponent as SignupSVG } from "../../assets/images/LS.svg";

const Signup = () => {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const login = getPathWithLanguage("/login", currentLanguage);
  const terms = getPathWithLanguage("/terms-and-conditions", currentLanguage);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error signing up");
      }
      navigate(login); // Redirect to login page after successful signup
    } catch (err) {
      setError(err.message || "Error signing up");
      toast.error(err.message || "Error signing up"); // Display error as toast
    }
  };

  // terms and conditions acceptances checkbox
  const handleCheckboxChange = () => {
    setAcceptTerms(!acceptTerms);
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="relative flex-1 flex justify-center items-center bg-gray-100">
        <SignupSVG className="w-3/4 h-3/4 text-blue-500" />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center flex-1 bg-gradient-to-r from-[#fcd9e1] to-[#fffdfd] px-6  sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {t("register")}
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          {t("register_message")}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("username")}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t("name")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              // placeholder="user@3skici.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            />
          </div>

          {/* terms and conditions  */}
          <div className="mb-1">
            <label className="inline-flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="m-1 text-sm text-gray-700">
                {t("i_agree_to_the")}
                <Link to={terms} className="text-blue-500 hover:underline m-1">
                  {t("terms_and_conditions")}
                </Link>
                .
              </span>
            </label>
          </div>
          {/* info about terms  */}
          {!acceptTerms && (
            <p className="text-sm text-red-500">
              {t(
                "you_must_agree_the_terms_and_conditions_to_proceed_with_the_registration"
              )}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={!acceptTerms}
          >
            {t("sign_up")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-3">
          {t("already_registered_login")}
          <Link to={login} className="text-blue-500 hover:underline m-1">
            {t("login")}
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Signup;
