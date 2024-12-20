import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/auth/forgetPassword`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Email is not found");
          } else {
            throw new Error("Server error");
          }
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Email sent successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // Handle password reset, e.g., send reset email
  };

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
        >
          Send Password Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
