import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (status === "succeeded") {
      toast.success("Email sent successfully!");
    } else if (status === "failed") {
      toast.error(error || "Something went wrong.");
    }
  }, [status, error]); // Monitor changes in status and error

  return (
    <div className="container mx-auto max-w-md mt-6">
      <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Password Reset Link"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
