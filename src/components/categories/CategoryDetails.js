import React, { useState } from 'react';

// Sample data (replace with actual API calls)
const categories = [
  { _id: "67310a1029828e86d1d1f4b8", name: "Electronic devices", description: "phones, laptops, etc." },
  { _id: "67374e80865fb1c11a6e50bb", name: "Foods", description: "Food category" },
  { _id: "6738bca97c9cd176d3581833", name: "Books", description: "book category" },
  { _id: "6738bcb87c9cd176d3581836", name: "Old books", description: "des" }
];

const products = [
  { _id: "6734cb1dd5c66e4682d70555", name: "broken phone", category: ["67310a1029828e86d1d1f4b8"], description: "with damage in the screen but still working for sell" },
  { _id: "6734cb1dd5c66e4682d70556", name: "laptop", category: ["67310a1029828e86d1d1f4b8"], description: "used laptop" },
  { _id: "6734cb1dd5c66e4682d70557", name: "book on JavaScript", category: ["6738bca97c9cd176d3581833"], description: "programming book" },
  { _id: "6734cb1dd5c66e4682d70558", name: "pasta", category: ["67374e80865fb1c11a6e50bb"], description: "Italian pasta" },
  // other products...
];

const CategoryFilter = () => {
  // State for selected category and filtered products
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Function to handle category change
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategoryId(categoryId);

    // Filter products based on selected category
    if (categoryId) {
      const filtered = products.filter(product =>
        product.category.includes(categoryId)
      );
      setFilteredProducts(filtered);
    } else {
      // If no category selected, show all products
      setFilteredProducts(products);
    }
  };

  return (
    <div>
      <h1>Product Filter</h1>

      {/* Category Select Dropdown */}
      <select
        value={selectedCategoryId}
        onChange={handleCategoryChange}
      >
        <option value="">Select a Category</option>
        {categories.map(category => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>

      {/* Display filtered products */}
      <div>
        <h2>Filtered Products</h2>
        {filteredProducts.length === 0 ? (
          <p>No products available for this category.</p>
        ) : (
          <ul>
            {filteredProducts.map(product => (
              <li key={product._id}>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
