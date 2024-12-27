import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  // Handle click outside the form to close the popup
  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setIsFormOpen(false); // Close the form
    }
  };

  // Setup the event listener for click outside
  useEffect(() => {
    if (isFormOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFormOpen]);

  if (status === "loading") {
    return <p>Loading. . .</p>;
  }

  if (!user || !token) {
    return toast.error(
      "You are not logged in, Please login to see your profile!!"
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
          onClick={() => setIsFormOpen(true)}
        >
          Update Profile Info
        </button>

        <div className="flex flex-col items-center space-y-4">
          <FaUserCircle className="text-gray-600 text-9xl" />
          <h1 className="text-2xl font-bold text-gray-800">{user?.name}</h1>
          <p className="text-gray-500">@{user?.username}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Profile Details
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Full Name:</span>
              <span className="text-gray-800">{user?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Username:</span>
              <span className="text-gray-800">{user?.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Member Since:</span>
              <span className="text-gray-800">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Popup form */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div
              ref={formRef}
              className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 min-h-[300px] max-w-lg"
            >
              <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    defaultValue={user?.name}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    defaultValue={user?.email}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    defaultValue={user?.phone}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="pic"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="pic"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    disabled
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    onClick={() => setIsFormOpen(false)} // close the form
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
