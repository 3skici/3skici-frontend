import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, selectCategories, selectError, selectLoading } from "../features/categories/categoriesSlice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories); // Use Redux state for categories
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError); // Error from Redux state
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  useEffect(() => {
      dispatch(fetchCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setNewCategory({ ...newCategory, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!newCategory.name || !newCategory.description) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/category/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) throw new Error("Failed to create category");

      setNewCategory({ name: "", description: "" });
      dispatch(fetchCategories()); // Refetch categories after creating
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (id) => {
    const categoryToEdit = categories.find((category) => category._id === id);
    setNewCategory(categoryToEdit);
    setIsEditing(true);
    setCurrentCategoryId(categoryToEdit._id);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/category/edit/${currentCategoryId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCategory),
        }
      );
      if (!response.ok) throw new Error("Failed to update category");

      setNewCategory({ name: "", description: "" });
      setIsEditing(false);
      setCurrentCategoryId(null);
      dispatch(fetchCategories()); // Refetch categories after updating
    } catch (err) {
      console.error("Error updating category:", err);
    }
  };

  const handleDelete = async (id) => {
  console.log("props pass ", id)

    try {
      const response = 
      await fetch(`${process.env.REACT_APP_API_URL}/category/remove/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }
      dispatch(fetchCategories()); // Refetch categories after deleting
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  }

  if (loading) return <p>Loading . . .</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Category Management</h1>

      <div className="mb-6 p-4 bg-white rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">{isEditing ? "Edit Category" : "Create Category"}</h2>
        <form onSubmit={(e) => { e.preventDefault(); isEditing ? handleUpdate() : handleCreate(); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={newCategory.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
            >
              {isEditing ? "Update Category" : "Create Category"}
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Category List</h2>
        <ul className="space-y-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="border p-4 rounded-lg bg-gray-50">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
                <div className="mt-4 space-x-2">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(category._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No categories found</p>
          )}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Category;
