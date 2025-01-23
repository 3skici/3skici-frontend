import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import ProductCard from "../products/ProductCard";
import { format } from "timeago.js";
import { toast } from "react-toastify";
import {
  fetchUserReport,
  submitReport,
} from "../../features/reports/reportSlice";
import { fetchedProductByCustomId } from "../../features/products/productsSlice";

const Report = () => {
  const token = useSelector((state) => state.auth.token);
  const fetchedProduct = useSelector(
    (state) => state.products.fetchedProductByCustomId
  );
  const prevReports = useSelector((state) => state.reports.reports || []);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    customId: "",
    reportType: "",
    otherReason: "",
    priority: "Low",
  });

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // Fetch all user previous reports when logged in
  useEffect(() => {
    dispatch(fetchUserReport());
  }, [isLoggedIn, dispatch]);

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFetchProduct = () => {
    if (!formData.customId) {
      toast.error("Please enter a Product Custom ID.");
      return;
    }

    dispatch(fetchedProductByCustomId(formData.customId))
      .unwrap() // Assuming the action supports .unwrap for promise resolution
      .then(() => {
        toast.success("Product fetched successfully!");
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        toast.error(
          error?.message || "Failed to fetch the product. Please try again."
        );
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("You need to be logged in to submit a report!");
      return;
    }

    dispatch(submitReport({ formData, token }))
      .unwrap()
      .then(() => {
        toast.success("Report submitted successfully!");
        // Clear form after successful submission
        setFormData({
          customId: "",
          reportType: "",
          otherReason: "",
          priority: "Low",
        });
        // Optionally refresh the list
        dispatch(fetchUserReport());
      })
      .catch((error) => {
        console.error("Error submitting report:", error);
        toast.error(error || "Failed to submit the report. Please try again.");
      });
  };
  const priorityStyle = {
    Low: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    High: "bg-red-100 text-red-800",
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString(); // Adjust formatting as needed
  };
  return (
    <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
      {/* Informational Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="shrink-0 p-2 bg-blue-100 rounded-lg">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Responsible Reporting
            </h2>
            <p className="text-gray-600">
              Maintain marketplace safety by reporting suspicious items.
              <span className="block mt-2 text-blue-600 font-medium">
                ⚠️ False reports may lead to account restrictions
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
        {/* Report Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            File Product Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product ID Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product ID
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="customId"
                  value={formData.customId}
                  onChange={handleChange}
                  placeholder="PROD-XXXXXX"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-400 placeholder-gray-400"
                />
                <button
                  type="button"
                  onClick={handleFetchProduct}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Report Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <select
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                required
              >
                <option value="">Select report reason</option>
                <option value="Fake Product">❌ Counterfeit Item</option>
                <option value="Harmful Product">⚠️ Dangerous Product</option>
                <option value="Illegal Product">🚫 Illegal Item</option>
                <option value="Other">🔍 Other Reason</option>
              </select>
            </div>

            {/* Other Reason */}
            {formData.reportType === "Other" && (
              <div className="animate-fadeIn">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Details
                </label>
                <textarea
                  name="otherReason"
                  value={formData.otherReason}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 h-32 placeholder-gray-400"
                  placeholder="Provide detailed information..."
                />
              </div>
            )}

            {/* Priority Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Low", "Medium", "High"].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, priority: level })
                    }
                    className={`p-2.5 rounded-lg border transition-colors ${
                      formData.priority === level
                        ? `${priorityStyle[level]} border-current`
                        : "bg-white border-gray-200 hover:border-blue-200"
                    }`}
                  >
                    {level === "Low" && "🟢 Low"}
                    {level === "Medium" && "🟡 Medium"}
                    {level === "High" && "🔴 High"}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Submit Report
            </button>
          </form>
        </div>

        {/* Product Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Product Preview
          </h3>

          {fetchedProduct ? (
            <div className="space-y-4">
              {fetchedProduct.images?.[0] && (
                <img
                  src={fetchedProduct.images[0]}
                  alt={fetchedProduct.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}
              <div>
                <h4 className="font-medium text-gray-800">
                  {fetchedProduct.name}
                </h4>
                <p className="text-sm text-gray-600">
                  {fetchedProduct.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-lg font-semibold">
                    {fetchedProduct.price?.amount}{" "}
                    {fetchedProduct.price?.currency}
                  </span>
                  <span className="text-sm text-gray-500">
                    {fetchedProduct.condition}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center p-6 border-2 border-dashed border-gray-200 rounded-lg">
              <div className="text-gray-400 mb-3">
                <svg
                  className="w-12 h-12 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">
                Enter product ID to preview details
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Report History */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Report History
        </h2>

        <div className="space-y-4">
          {prevReports?.length > 0 ? (
            prevReports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-lg border border-gray-200 p-5 hover:border-blue-200 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        #{report.reportId}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          priorityStyle[report.priority]
                        }`}
                      >
                        {report.priority} Priority
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-800">
                      {report.reportType === "Other"
                        ? report.otherReason
                        : report.reportType}
                    </h4>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">
                    {format(report.createdAt)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm ${
                      report.status === "Pending"
                        ? "text-yellow-600"
                        : report.status === "Resolved"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    Status: {report.status}
                  </span>
                </div>

                {report.adminAction?.reply && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 text-blue-500 mt-1">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Admin Response
                        </p>
                        <p className="text-sm text-gray-600">
                          {report.adminAction.reply}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                No previous reports found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
