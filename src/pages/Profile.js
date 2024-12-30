import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateUserProfile } from "../features/auth/authSlice";
import { getImageUrl } from "../utils/imgagesHelper";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error("File size exceeds 5MB.");
        return;
      }
      setAvatar(file); // Set the avatar file for upload
    }
  };

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

  useEffect(() => {
    if (status === "failed" && error) {
      toast.error(error);
    }
  }, [status, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = new FormData();

    //append form data
    for (let key in formData) {
      dataToSend.append(key, formData[key]);
    }
    if (avatar) {
      dataToSend.append("avatar", avatar);
    }

    const result = await dispatch(updateUserProfile(dataToSend)); // Handle result of dispatc
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Profile updated successfully!");
    } else {
      toast.error("Failed to update profile. Please try again.");
    }
    setIsFormOpen(false);
  };

  if (status === "loading") {
    return <p>Loading. . .</p>;
  }

  if (!user || !token) {
    return toast.error(
      "You are not logged in, Please login to see your profile!!"
    );
  }

  // Construct the full image URL if the avatar is provided
  const avatarUrl = user?.avatar
    ? `${process.env.REACT_APP_API_URL.replace(
        /\/+$/,
        ""
      )}/${user.avatar.replace(/^\/+/, "")}`
    : null;

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
          {/* Check if avatar exists, if not, fallback to FaUserCircle */}
          <img
            src={getImageUrl(user?.avatar)} // Display user avatar
            alt="User Avatar"
            className="rounded-full w-32 h-32 object-cover" // Style for avatar image
          />
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
              <form onSubmit={handleSubmit}>
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
                    name="name"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                    value={formData.username}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
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
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="avatar"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*" // Optional: Restrict to image files
                    onChange={handleAvatarChange} // Add the onChange handler
                    className="mt-1 p-2 border border-gray-300 rounded-lg w-full"
                  />
                  {avatar && (
                    <p className="text-sm text-gray-500 mt-1">
                      Selected file: {avatar.name}
                    </p>
                  )}
                  {avatar && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Selected file: {avatar.name}
                      </p>
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Avatar Preview"
                        className="w-16 h-16 rounded-full object-cover mt-2"
                      />
                    </div>
                  )}
                </div>
                <div>
                  {user.avatars && user.avatars.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Previous Avatars
                      </h3>
                      <div className="flex space-x-4">
                        {user.avatars.map((avatarPath, index) => (
                          <img
                            key={index}
                            src={avatarUrl}
                            alt={`Previous Avatar ${index + 1}`}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  )}
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
