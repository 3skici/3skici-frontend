import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice"; // Import the login thunk action
import { Link, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { toast } from "react-toastify";

const Login = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
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
              Password
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
            <p className="text-right text-sm text-gray-600 mt-1">
              <Link to={forgetPass} className="text-blue-500 hover:underline">
                Forgot my password!
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-pale-gold text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            disabled={status === "loading"} // Disable button during loading
          >
            {status === "loading" ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Not registered?{" "}
          <Link to={signup} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
