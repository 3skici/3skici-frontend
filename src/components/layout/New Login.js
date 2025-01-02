import image from "../../assets/images/shopping.jpg";
import React from "react";

const LoginPage = () => {
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
      <div className="flex flex-col justify-center items-center flex-1 bg-white px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome</h1>
        <p className="text-gray-600 mb-8">Log in to your account to continue</p>

        <form className="w-full max-w-md space-y-6">
          <div>
            <input
              type="email"
              placeholder="awesome@user.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline block mt-2"
            >
              Forgot your password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-blue-500 hover:underline">
            Sign up!
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
