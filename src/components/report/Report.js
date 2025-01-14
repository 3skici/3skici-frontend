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
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informational Banner */}
        <div className="col-span-2 bg-blue-100 border border-blue-200 text-blue-800 p-4 rounded-lg shadow-sm mb-6">
          <p className="text-lg font-semibold mb-2">
            Thank You for Your Responsibility!
          </p>
          <p>
            We appreciate your effort in reporting inappropriate or illegal
            products to keep our marketplace safe. Please remember to use this
            feature responsibly and refrain from submitting false or misleading
            reports.
          </p>
        </div>

        {/* Report Form */}
        <div className="border rounded-lg p-8 shadow-lg bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Report Product
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-group flex items-center">
              <label
                className="block text-gray-600 text-sm font-medium mr-4"
                htmlFor="customId"
              >
                Product Custom ID:
              </label>
              <input
                type="text"
                id="customId"
                name="customId"
                value={formData.customId}
                onChange={handleChange}
                className="flex-grow border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleFetchProduct}
                className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Display Product
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="reportType">
                Reason for Report
              </label>
              <select
                id="reportType"
                name="reportType"
                value={formData.reportType}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Select a reason</option>
                <option value="Fake Product">Fake Product</option>
                <option value="Harmful Product">Harmful Product</option>
                <option value="Illegal Product">Illegal Product</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {formData.reportType === "Other" && (
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="otherReason">
                  Other Reason:
                </label>
                <input
                  type="text"
                  id="otherReason"
                  name="otherReason"
                  value={formData.otherReason}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="priority">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Submit Report
            </button>
          </form>
        </div>

        {/* Product Card */}
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white relative">
          {fetchedProduct ? (
            <ProductCard key={fetchedProduct._id} product={fetchedProduct} />
          ) : (
            <div className="p-6 text-gray-500">
              Enter a Product Custom ID (e.g., PROD-xxxx) and click "Fetch
              Product" to display it here.
            </div>
          )}
        </div>
      </div>

      {/* Previous Reports */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Previous Reports</h2>
        <div className="space-y-4">
          {prevReports && prevReports.length > 0 ? (
            prevReports.map((report) => {
              const displayedReason =
                report.reportType === "Other"
                  ? report.otherReason
                  : report.reportType;
              const createdAt = formatDate(report.createdAt);

              return (
                <div
                  key={report._id}
                  className="p-4 border rounded-lg bg-gray-50"
                >
                  <p className="text-gray-700 font-semibold">
                    Report ID: {report.reportId}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Status:</span>{" "}
                    {report.status}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Reason:</span>{" "}
                    {displayedReason}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Priority:</span>{" "}
                    <span
                      className={`inline-block px-2 py-1 rounded ${
                        priorityStyle[report.priority]
                      }`}
                    >
                      {report.priority}
                    </span>
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Submitted On:</span>{" "}
                    {format(report.createdAt)} {/* Using timeago.js format */}
                  </p>
                  {report.adminAction && report.adminAction.reply && (
                    <p className="text-gray-500">
                      <span className="font-semibold">Admin Reply:</span>{" "}
                      {report.adminAction.reply}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">No previous reports found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
