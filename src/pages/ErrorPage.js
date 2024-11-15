import React from "react";

const ErrorPage = ({ errorCode = "404", message = "Page Not Found" }) => {
  const suggestions = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    { name: "Contact Us", link: "/contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-7xl font-bold text-gray-800">{errorCode}</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! {message}
      </h2>
      <p className="mt-2 text-gray-500">
        The page you’re looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Search for items..."
          className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <button className="ml-2 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700">
          Search
        </button>
      </div>

      <div className="mt-8 space-y-2">
        <p className="text-gray-600 font-medium">Helpful Links:</p>
        <ul className="flex flex-col space-y-2">
          {suggestions.map((item) => (
            <li key={item.name}>
              <a
                href={item.link}
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <a
          href="/categories/popular"
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          Browse Popular Categories
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
