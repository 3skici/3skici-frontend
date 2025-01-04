import React, { useState } from "react";

const Settings = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const toggleNotifications = (type) => {
    setNotifications((prevNotifications) => ({
      ...prevNotifications,
      [type]: !prevNotifications[type],
    }));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      setIsDeleting(true);
      // Simulate account deletion
      setTimeout(() => {
        alert("Account deleted successfully!");
        setIsDeleting(false);
        // Redirect or clear user data (simulated here)
      }, 2000);
    }
  };

  const handleSaveChanges = () => {
    // Logic to save the changes (e.g., API call)
    setIsEditing(false);
    alert("Changes saved successfully!");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      {/* User Info Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Edit User Info</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              disabled={!isEditing}
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              disabled={!isEditing}
            />
          </div>
          <div className="flex space-x-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Edit Info
              </button>
            ) : (
              <button
                onClick={handleSaveChanges}
                className="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications Preferences */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Notifications Preferences
        </h2>
        <div className="space-y-4">
          <div>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={notifications.emailNotifications}
                onChange={() => toggleNotifications("emailNotifications")}
                className="mr-2"
              />
              Email Notifications
            </label>
          </div>
          <div>
            <label className="flex items-center text-gray-700">
              <input
                type="checkbox"
                checked={notifications.smsNotifications}
                onChange={() => toggleNotifications("smsNotifications")}
                className="mr-2"
              />
              SMS Notifications
            </label>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        <p className="text-red-600 mb-4">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="bg-red-600 text-white px-4 py-2 rounded-md"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete Account"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
