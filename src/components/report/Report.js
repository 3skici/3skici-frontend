import React, { useState, useEffect } from "react";
import { FaHeart, FaCartPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";

const Report = (productId) => {
  const token = useSelector((state) => state.auth.token);

  const currentLanguage = i18n.language;
  const login = getPathWithLanguage("/login", currentLanguage);

  // const { productId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productId: "",
    reportType: "",
    otherReason: "",
    priority: "low",
  });
  const [product, setProduct] = useState(null);
  const [reason, setReason] = useState("");
  const [priority, setPriority] = useState("Low");
  const [prevReports, setPrevReports] = useState([]);
  const [isLoggedI, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/product/${productId}`
        );
        if (!response.ok) {
          throw new Error("Field to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Fetch previous reports
    const fetchReports = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/report?productId=${productId}`
        );
        if (!response.ok) {
          throw new Error("Field to fetch reports");
        }
        setPrevReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchProduct();
    fetchReports();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedI) {
      alert("You need to be logged in to submit a report!");
      navigate(login);
      return;
    }
    try {
      const response = await fetch("${process.env.REACT_APP_API_URL}/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit report");
      }
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Card */}
        <div className="border rounded-lg overflow-hidden shadow-lg bg-white relative">
          {product && (
            <>
              <div className="absolute top-2 right-2">
                <FaHeart className="text-red-500 cursor-pointer hover:text-red-700 transition duration-300" />
              </div>
              <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {product.isAvailable ? "Available" : "Sold Out"}
              </div>
              <div className="flex justify-center items-center h-56 bg-gray-200">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-500 text-lg">{product.name}</span>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-900 text-2xl font-bold mb-4">
                  ${product.price}
                </p>
                <p className="text-gray-700 mb-2 truncate">
                  {product.description || "No description available"}
                </p>
                <p className="text-gray-500">
                  Condition: {product.condition || "Unknown"}
                </p>
                <p className="text-gray-500">
                  Category: {product.category?.name || "Uncategorized"}
                </p>
                <p className="text-gray-500">
                  Seller: {product.seller ? product.seller.name : "Not found"}
                </p>
              </div>
              <div className="flex flex-col items-center p-4 border-t space-y-2">
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 w-full justify-center">
                  <FaCartPlus className="mr-2" /> Add to Cart
                </button>
                <p className="text-xs text-gray-500">ID: {product.customId}</p>
              </div>
            </>
          )}
        </div>

        {/* Report Form */}
        <div className="border rounded-lg p-6 shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-4">Report Product</h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <label className="block text-gray-700" htmlFor="otherReason">
                Product ID:
              </label>
              <input
                type="text"
                id="productId"
                name="productId"
                value={formData.productId}
                // onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="reason">
                Reason for Report
              </label>
              <select
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
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
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="otherReason">
                Other Reason:
              </label>
              <input
                type="text"
                id="otherReason"
                name="otherReason"
                value={formData.otherReason}
                // onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="priority">
                Priority Level
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
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
      </div>

      {/* Previous Reports */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Previous Reports</h2>
        <div className="space-y-4">
          {prevReports.length > 0 ? (
            prevReports.map((report) => (
              <div
                key={report._id}
                className="p-4 border rounded-lg bg-gray-50"
              >
                <p className="text-gray-700 font-semibold">
                  Report ID: {report.reportId}
                </p>
                <p className="text-gray-500">Reason: {report.reportType}</p>
                <p className="text-gray-500">Status: {report.status}</p>
                {report.adminAction && report.adminAction.reply && (
                  <p className="text-gray-500">
                    Admin Reply: {report.adminAction.reply}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No previous reports found for this product.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
