import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2, FiPlusCircle } from "react-icons/fi";
import {
  deleteUserProduct,
  fetchUserProducts,
} from "../../features/products/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import i18n from "../../i18n";
import { getImageUrl } from "../../utils/imgagesHelper";

const UserProduct = () => {
  const currentLanguage = i18n.language;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products || []);
  console.log("products", products);
  const { user, token } = useSelector((state) => state.auth);

  // userId will be extracted from user._id
  const userId = user?._id;

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchUserProducts({ userId, token }))
        .unwrap()
        .catch((error) => {
          // Display error message using toast
          toast.error("Failed to fetch products. Please try again later.");
        });
    }
  }, [dispatch, userId, token]);

  const handleDeleteProduct = async (id) => {
    try {
      await dispatch(deleteUserProduct(id)).unwrap();
      toast.success("Product deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete item.");
    }
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Products</h2>
        <Link
          to="/add-product"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlusCircle className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4"
            >
              <div className="flex gap-4 mb-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                  {product.images?.[0] && (
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>

                  {/* Categories Container */}
                  <div className="flex flex-wrap gap-2 mt-1 mb-2">
                    {product.category?.length > 0 ? (
                      product.category.map((category, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 truncate max-w-[120px]"
                          title={category.name} // Show full name on hover
                        >
                          {category.name}
                        </span>
                      ))
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        Unclassified
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <p className="text-lg font-medium text-blue-600 mt-1">
                    {product.price.amount} {product.price.currency}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <Link
                  to={getPathWithLanguage(
                    `/test/${product.customId}`,
                    currentLanguage
                  )}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <FiEdit className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProduct;
