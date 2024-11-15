import React from "react";

const UserSettings = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-gray-800 p-6 border-b">User Settings</h1>

        {/* Profile Information */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium text-gray-700">Profile Information</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-gray-600">Profile Photo</label>
              <input type="file" className="w-full text-gray-500" />
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Save Changes
            </button>
          </form>
        </div>

        {/* Password and Security */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium text-gray-700">Password and Security</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="New Password"
              />
            </div>
            <div>
              <label className="block text-gray-600">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Confirm Password"
              />
            </div>
            <div>
              <label className="block text-gray-600">Two-Factor Authentication</label>
              <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
                Set up 2FA
              </button>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Update Password
            </button>
          </form>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-medium text-gray-700">Notification Preferences</h2>
          <form className="mt-4 space-y-4">
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Email Notifications
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                In-App Notifications
              </label>
            </div>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Save Preferences
            </button>
          </form>
        </div>

        {/* Privacy Settings */}
        <div className="p-6">
          <h2 className="text-xl font-medium text-gray-700">Privacy Settings</h2>
          <form className="mt-4 space-y-4">
        
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Save Privacy Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
