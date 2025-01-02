import React from "react";
import { useSelector } from "react-redux";

const Test = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);
  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-xl font-bold cursor-pointer">Logo</div>

      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Language Selector */}
        <div className="relative group">
          <button className="flex items-center space-x-1">
            <span className="material-icons">language</span>
            {/* <span>{language}</span> */}
          </button>
          <div className="absolute right-0 mt-2 hidden group-hover:block">
            <ul className="bg-white border rounded shadow">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                // onClick={() => setLanguage("EN")}
              >
                English
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                // onClick={() => setLanguage("AR")}
              >
                Arabic
              </li>
            </ul>
          </div>
        </div>

        {/* Primary Actions */}
        {isLoggedIn ? (
          <>
            {/* Messaging Icon */}
            <button className="relative">
              <span className="material-icons">notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Favorites Icon */}
            <button>
              <span className="material-icons">favorite</span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1">
                <span className="material-icons">account_circle</span>
              </button>
              <div className="absolute right-0 mt-2 hidden group-hover:block">
                <ul className="bg-white border rounded shadow">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    My Account
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Settings
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    // onClick={toggleLogin}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Login/Register */}
            <button
              className="px-4 py-2 border rounded hover:bg-gray-100"
              //   onClick={toggleLogin}
            >
              Login
            </button>
          </>
        )}

        {/* Sell Product Button */}
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sell Product
        </button>
      </div>
    </nav>
  );
};

export default Test;
