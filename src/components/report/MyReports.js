import React, { useState } from "react";

// Mock Data
const reportTypes = [
  "Fake Product",
  "Harmful Product",
  "Illegal Product",
  "Other",
];
const reportStatuses = ["Pending", "Reviewed", "Resolved"];
const priorityLevels = ["Low", "Medium", "High"];

const reportsData = [
  {
    reportId: "REP-1234",
    productName: "Product 1",
    reportType: "Fake Product",
    status: "Pending",
    priority: "High",
    lastUpdated: "2025-01-12",
    adminAction: "No action",
  },
  {
    reportId: "REP-5678",
    productName: "Product 2",
    reportType: "Harmful Product",
    status: "Reviewed",
    priority: "Medium",
    lastUpdated: "2025-01-10",
    adminAction: "Actioned",
  },
  {
    reportId: "REP-9101",
    productName: "Product 3",
    reportType: "Illegal Product",
    status: "Resolved",
    priority: "Low",
    lastUpdated: "2025-01-08",
    adminAction: "Resolved",
  },
];

// Sorting Helper Function
const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? 1 : -1);
};

const MyReports = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("reportId");
  const [filteredReports, setFilteredReports] = useState(reportsData);

  // Sorting handler
  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterChange = (event, filterType) => {
    const value = event.target.value;
    if (filterType === "status") {
      setFilteredReports(
        reportsData.filter((report) => report.status === value)
      );
    } else if (filterType === "priority") {
      setFilteredReports(
        reportsData.filter((report) => report.priority === value)
      );
    } else if (filterType === "type") {
      setFilteredReports(
        reportsData.filter((report) => report.reportType === value)
      );
    }
  };

  const sortedReports = [...filteredReports].sort(
    getComparator(order, orderBy)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">My Reports</h1>

      {/* Filter Controls */}
      <div className="flex gap-4 mb-4 flex-wrap">
        <div className="w-full sm:w-1/3">
          <label htmlFor="status" className="block text-lg">
            Status
          </label>
          <select
            id="status"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => handleFilterChange(e, "status")}
            defaultValue=""
          >
            <option value="">
              <em>All</em>
            </option>
            {reportStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label htmlFor="priority" className="block text-lg">
            Priority
          </label>
          <select
            id="priority"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => handleFilterChange(e, "priority")}
            defaultValue=""
          >
            <option value="">
              <em>All</em>
            </option>
            {priorityLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full sm:w-1/3">
          <label htmlFor="type" className="block text-lg">
            Report Type
          </label>
          <select
            id="type"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => handleFilterChange(e, "type")}
            defaultValue=""
          >
            <option value="">
              <em>All</em>
            </option>
            {reportTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => handleRequestSort("reportId")}
              >
                Report ID
              </th>
              <th className="p-2 text-left">Product Name</th>
              <th
                className="p-2 text-left cursor-pointer"
                onClick={() => handleRequestSort("reportType")}
              >
                Report Type
              </th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Priority</th>
              <th className="p-2 text-left">Last Updated</th>
              <th className="p-2 text-left">Admin Action</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedReports.map((report) => (
              <tr key={report.reportId} className="border-t">
                <td className="p-2">{report.reportId}</td>
                <td className="p-2">{report.productName}</td>
                <td className="p-2">{report.reportType}</td>
                <td className="p-2">{report.status}</td>
                <td className="p-2">{report.priority}</td>
                <td className="p-2">{report.lastUpdated}</td>
                <td className="p-2">{report.adminAction}</td>
                <td className="p-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded">
                    View
                  </button>
                  <button className="px-4 py-2 bg-gray-300 text-black rounded ml-2">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyReports;
