import React from "react";

const ErrorPage = ({ errorCode = "404", message = "Page Not Found" }) => {
  const suggestions = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <div class="grid h-screen place-content-center bg-gray-100 px-4">
        <h1 class="uppercase tracking-widest text-gray-500 mb-4">
          404 | Not Found
        </h1>
        <a href="/" class="mt-4 text-blue-500 hover:text-blue-700">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
