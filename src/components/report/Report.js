import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import ProductCard from "../products/ProductCard";
import { format } from "timeago.js";

const Report = () => {
  const token = useSelector((state) => state.auth.token);
  const currentLanguage = i18n.language;
  const login = getPathWithLanguage("/login", currentLanguage);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customId: "",
    reportType: "",
    otherReason: "",
    priority: "Low",
  });

  const reportTime = format(new Date());

  const [product, setProduct] = useState(null);
  const [prevReports, setPrevReports] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  // Fetch all user previous reports when logged in
  useEffect(() => {
    const fetchUserReports = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/report/my-reports`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reports");
        }
        const data = await response.json();
        setPrevReports(data.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setPrevReports([]);
      }
    };

    fetchUserReports();
  }, [isLoggedIn, token]);

  // Fetch product details whenever customId changes
  useEffect(() => {
    const { customId } = formData;
    if (!customId) {
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/product/${customId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    };

    fetchProduct();
  }, [formData.customId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("You need to be logged in to submit a report!");
      navigate(login);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);

        // Re-fetch user reports after submitting a new one
        const updatedReportsResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/report/my-reports`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (updatedReportsResponse.ok) {
          const updatedData = await updatedReportsResponse.json();
          setPrevReports(updatedData.data);
        }
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report");
    }
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
        {/* Report Form */}
        <div className="border rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">Report Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="customId">
                Product Custom ID:
              </label>
              <input
                type="text"
                id="customId"
                name="customId"
                value={formData.customId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
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
          {product ? (
            <ProductCard key={product._id} product={product} />
          ) : (
            <div className="p-4 text-gray-500">
              Enter a Product Custom ID (e.g., PROD-xxxx) to display the product
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
