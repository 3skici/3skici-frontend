import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../utils/imgagesHelper";
import { format } from "timeago.js";
import EditProfile from "../components/profile/EditProfile";
import UserProduct from "../components/products/UserProduct";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    toast.error("Please login in order to see your profile page!");
    return;
  }
  const tabs = [
    // { id: "favorites", title: "Favorites" },
    { id: "product_management", title: "Product Management" },
    { id: "settings", title: "Settings" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      // case "favorites":
      //   return <p>Here is you favorite products.</p>;
      case "product_management":
        return (
          <div>
            <div className="space-y-6">
              <UserProduct />
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <div className="space-y-6">
              <EditProfile />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg flex flex-col lg:flex-row overflow-hidden w-full">
        {/* Left Side - User Information */}
        <div className="w-full lg:w-1/3 rounded bg-gray-200 p-6 flex flex-col items-center space-y-2 mx-6">
          <img
            src={getImageUrl(user?.avatar)}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-lg font-semibold text-center">{user.name}</h2>
          <p className="text-sm text-gray-600 text-center">@{user.username}</p>
          <div className="mt-4 text-sm space-y-4">
            <p className="mb-2 text-gray-700">
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {user.email}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-medium text-gray-800">Phone:</span>{" "}
              {user.phone}
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-medium text-gray-800">Role:</span>
              <span className="font-semibold text-indigo-600">{user.role}</span>
            </p>
            <p className="mb-2 text-gray-700">
              <span className="font-medium text-gray-800">Joined:</span>
              <span className="font-semibold text-green-600">
                {format(user.createdAt)}
              </span>
            </p>
          </div>
        </div>

        {/* Right Side - Tabs and Content */}
        <div className="w-full rounded bg-gray-200 lg:w-2/3 p-6">
          <div className="border-b mb-6 bg-gray-100 ">
            <div className="flex rounded-xl p-2 space-x-4 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-md whitespace-nowrap ${
                    activeTab === tab.id
                      ? " text-blue-600 border-b-2 border-blue-600"
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
