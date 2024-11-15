// src/components/Dashboard.jsx

import React, { useState } from "react";
// import Overview from "./sections/Overview";
// import MyListings from "./sections/MyListings";
// import Favorites from "./sections/Favorites";
// import Messages from "./sections/Messages";
// import AccountSettings from "./sections/AccountSettings";

const sections = [
  { id: "overview", title: "Overview", },
  { id: "my-listings", title: "My Listings", },
  { id: "favorites", title: "Favorites",  },
  { id: "messages", title: "Messages & Notifications", },
  { id: "account-settings", title: "Account Settings", },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 ${
                activeSection === section.id ? "bg-gray-200 font-bold" : ""
              }`}
            >
              {section.title}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {sections.find((section) => section.id === activeSection)?.component}
      </main>
    </div>
  );
};

export default Dashboard;
