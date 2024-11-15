import React, { useState } from "react";
import { useSelector } from "react-redux";

const SellProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    images: [],
  });

  const categories = useSelector((state) => state.categories.items || []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle product submission
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Sell a Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full py-2 px-4 border rounded focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full py-2 px-4 border rounded focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full py-2 px-4 border rounded focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full py-2 px-4 border rounded focus:outline-none"
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            className="w-full py-2 px-4 border rounded focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default SellProduct;
