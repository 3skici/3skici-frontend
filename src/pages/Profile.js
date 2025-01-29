import React, { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../utils/imgagesHelper";
import { format } from "timeago.js";
import EditProfile from "../components/profile/EditProfile";
import UserProduct from "../components/products/UserProduct";
import { toast } from "react-toastify";
import EditProfileModal from "../components/profile/EditProfileModal";
import UserFavorites from "../components/profile/UserFavorites";

const Profile = () => {
  const { user, status, error } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("overview");
  const [showEditModal, setShowEditModal] = useState(false);

  if (!user) {
    toast.error("Please login in order to see your profile page!");
    return;
  }
  const tabs = [
    // { id: "favorites", title: "Favorites" },
    { id: "product_management", title: "Product Management" },
    { id: "favorites", title: "Favorites" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "product_management":
        return <UserProduct />;
      case "favorites":
        return <UserFavorites />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex justify-center">
      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal user={user} onClose={() => setShowEditModal(false)} />
      )}
      <div className=" shadow-lg rounded-lg flex flex-col overflow-hidden w-full">
        {/* upper Side - User Information */}
        <div className="w-full  bg-gray-200 p-6 flex flex-col items-center space-y-2 ">
          <img
            src={getImageUrl(user?.avatar)}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            {user.name}
          </h2>
          <p className="text-sm text-gray-600 text-center">@{user.username}</p>
          {/* User Details Grid */}
          <div className="w-full mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(4,1fr)_min-content] gap-6 text-sm">
              {/* Email */}
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Email:</span>
                  {user.email}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Phone:</span>
                  {user.phone}
                </p>
              </div>

              {/* Role */}
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Role:</span>
                  <span className="font-semibold text-indigo-600">
                    {user.role}
                  </span>
                </p>
              </div>

              {/* Joined */}
              <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <p className="mb-2 text-gray-700">
                  <span className="font-medium text-gray-800">Joined:</span>
                  <span className="font-semibold text-green-600">
                    {format(user.createdAt)}
                  </span>
                </p>
              </div>

              {/* Settings Icon */}
              <div
                className="bg-white p-4  rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-center items-center cursor-pointer"
                onClick={() => setShowEditModal(true)}
              >
                <IoSettingsSharp size={20} className="text-green-600 w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        {/*  - Tabs and Content */}
        <div className="w-full  bg-gray-200  ">
          <div className="border-b mb-6 bg-gray-100">
            <div className="flex rounded-xl p-2 space-x-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap ${
                    activeTab === tab.id
                      ? " text-blue-600 border-b-2 border-blue-600 bg-gray-300"
                      : "text-gray-500 hover:text-blue-600"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
          <div className="text-gray-800 ">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
