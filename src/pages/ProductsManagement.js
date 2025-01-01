import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  deleteProduct,
} from "../features/products/productsSlice";
import { FaCopy, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Import React Toastify components and styles
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../components/common/pagination/Pagination";
import { getPathWithLanguage } from "../utils/pathHelpers";
import i18n from "../i18n";

const ProductsManagement = () => {
  const currentLanguage = i18n.language;

  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // You can make this dynamic or configurable

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // This state will control when to mask the IDs. After 2 seconds, the ID styling will change.
  const [maskIds, setMaskIds] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  // Optional: Reset to first page when products change (e.g., after deletion)
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .then(() => {
          toast.success("Product deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((err) => {
          setError(err.message);
          toast.error(`Error deleting product: ${err.message}`, {
            position: "top-right",
            autoClose: 3000,
          });
        });
    }
  };

  const handleEdit = (productId) => {
    navigate(
      getPathWithLanguage(`/edit-product/${productId}`, currentLanguage)
    );
  };

  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const handleCopy = (id) => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success("Product ID copied to clipboard!", {
          position: "top-right",
          autoClose: 2000, // Auto close after 2 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((err) => {
        toast.error("Failed to copy ID.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setError("Failed to copy ID");
      });
  };

  if (status === "loading") {
    return <div>Loading products...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Get current page products
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 p-4">
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6">
          Product Management
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center"
            onClick={handleAddProduct}
          >
            <FaPlus className="mr-2" /> Add New Product
          </button>
        </div>

        <section className="container px-4 mx-auto">
          <div className="flex flex-col">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <div className="flex items-center gap-x-3">
                            <span>Name</span>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Description
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Condition
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Custom ID
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {currentProducts.map((product) => {
                        const displayId =
                          product.customId || product._id || "N/A";
                        const shortId =
                          displayId !== "N/A" ? displayId.slice(-8) : "N/A";

                        // If maskIds is true, show a dotted underline style
                        // (or replace the text completely if desired)
                        const idClasses = maskIds
                          ? "underline decoration-dotted"
                          : "";

                        return (
                          <tr
                            key={product._id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="inline-flex items-center gap-x-3">
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap max-w-xs">
                              <span
                                className="block truncate"
                                title={product.description}
                              >
                                {product.description.length > 50
                                  ? `${product.description.slice(0, 50)}...`
                                  : product.description}
                              </span>
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {product.price
                                ? `$${product.price.amount}`
                                : "N/A"}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              {product.condition}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                              <div className="flex items-center">
                                <p
                                  className={`text-xs text-gray-500 ${idClasses}`}
                                >
                                  Product ID:{" "}
                                  <span className="font-semibold">
                                    {shortId}
                                  </span>
                                </p>
                                {displayId !== "N/A" && (
                                  <button
                                    className="ml-2 text-gray-500 hover:text-blue-600 focus:outline-none"
                                    onClick={() => handleCopy(displayId)}
                                    title="Copy full ID"
                                  >
                                    <FaCopy className="text-sm" />
                                  </button>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center gap-x-6">
                                <button
                                  className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none flex items-center"
                                  onClick={() => handleEdit(product.customId)}
                                >
                                  <FaEdit className="mr-1" /> Edit
                                </button>
                                <button
                                  className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none flex items-center"
                                  onClick={() => handleDelete(product._id)}
                                >
                                  <FaTrashAlt className="mr-1" /> Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Dynamic Pagination Section */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>
      </div>
    </div>
  );
};

export default ProductsManagement;
