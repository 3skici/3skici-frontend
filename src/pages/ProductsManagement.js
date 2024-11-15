import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../features/products/productsSlice"; // Import actions for fetching and deleting products
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const ProductsManagement = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const status = useSelector((state) => state.products.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId))
        .unwrap()
        .catch((err) => setError(err.message));
    }
  };

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`); // Redirect to product edit page
  };

  const handleAddProduct = () => {
    navigate("/add-product"); // Redirect to add product form page
  };

  if (status === "loading") {
    return <div>Loading products...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Product Management</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="flex justify-end mb-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 flex items-center"
            onClick={handleAddProduct}
          >
            <FaPlus className="mr-2" /> Add New Product
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Description</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Condition</th>
                <th className="py-2 px-4 border-b text-left">Custom ID</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-100 transition duration-300">
                  <td className="py-2 px-4 border-b truncate max-w-xs">{product.name}</td>
                  <td className="py-2 px-4 border-b truncate max-w-xs">{product.description}</td>
                  <td className="py-2 px-4 border-b">${product.price}</td>
                  <td className="py-2 px-4 border-b">{product.condition}</td>
                  <td className="py-2 px-4 border-b">{product.customId}</td>
                  <td className="py-2 px-4 border-b flex items-center">
                    <button
                      className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 mr-2 transition duration-300 flex items-center"
                      onClick={() => handleEdit(product._id)}
                    >
                      <FaEdit className="mr-1" /> Edit
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300 flex items-center"
                      onClick={() => handleDelete(product._id)}
                    >
                      <FaTrashAlt className="mr-1" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsManagement;
