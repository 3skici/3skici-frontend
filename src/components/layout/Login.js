import { useTranslation } from "react-i18next";
import image from "../../assets/images/shopping.jpg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { login } from "../../features/auth/authSlice";

const Login = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const { user, status, error } = useSelector((state) => state.auth); // Access auth state from Redux

  const currentLanguage = i18n.language;
  const signup = getPathWithLanguage("/signup", currentLanguage);
  const forgetPass = getPathWithLanguage("/forgot-password", currentLanguage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)); // Dispatch the login action with form data
  };

  // Redirect upon successful login
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to dashboard or desired route
    }
  }, [user, navigate]);

  // Show error toast if there's an error
  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error); // Display error toast
    }
  }, [status, error]);
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Left Section */}
      <div className="relative flex-1">
        <img
          src={image}
          alt="Background"
          className="absolute inset-0 object-cover w-full h-full brightness-75"
        />
      </div>

      {/* Right Section */}
      <div className="flex flex-col justify-center items-center flex-1 bg-white px-6 py-8 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 text-center">
          {t("login_welcome")}
        </h1>
        <p className="text-gray-600 mb-8 text-center">{t("login_message")}</p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
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
              value={formData.email}
              onChange={handleChange}
              required
              // placeholder="user@3skici.com"
              className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent `}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-right text-sm text-gray-600 mt-1">
              <Link to={forgetPass} className="text-blue-500 hover:underline">
                {t("forgot_my_password")}
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={status === "loading"} // Disable button during loading
          >
            {status === t("logging_in") ? t("logging_in") : t("login")}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          {t("not_registered")}
          <Link to={signup} className="text-blue-500 hover:underline m-1">
            {t("register")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
