import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserProduct,
  fetchUserProducts,
} from "../../features/products/productsSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const UserProduct = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
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
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right">
        <thead className="text-xs uppercase">
          <tr className="bg-gray-50">
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id} className="border-b">
                <th scope="row" className="px-6 py-4 font-medium">
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  {product.price.amount} {product.price.currency}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </a>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-red-600 hover:underline"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProduct;
