import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../features/auth/authSlice";

const EditProfile = () => {
  const { user, status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [avatar, setAvatar] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  // Construct the full image URL if the avatar is provided
  const avatarUrl = user?.avatar
    ? `${process.env.REACT_APP_API_URL.replace(
        /\/+$/,
        ""
      )}/${user.avatar.replace(/^\/+/, "")}`
    : null;

  return (
    <div className="p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
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
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
