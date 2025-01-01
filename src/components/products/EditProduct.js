import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectCategories,
  selectLoading,
  selectError,
  fetchCategories,
} from "../../features/categories/categoriesSlice";
import { updateProduct } from "../../features/products/productsSlice";
const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const productToEdit = products
    ? products.find((product) => product._id === productId)
    : null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    condition: "used",
    categories: [],
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        condition: productToEdit.condition || "used",
        categories: productToEdit.categories || [],
      });
    }
  }, [productToEdit]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "categories") {
      setFormData((prevData) => {
        const updatedCategories = checked
          ? [...prevData.categories, value]
          : prevData.categories.filter((cat) => cat !== value);
        return { ...prevData, categories: updatedCategories };
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productToEdit) {
      console.error("Product to edit not found.");
      return;
    }
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== productToEdit[key]) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    if (Object.keys(updatedData).length > 0) {
      dispatch(updateProduct({ id: productId, updatedData }))
        .unwrap()
        .then(() => {
          navigate("/:lang/products"); // Redirect to products page after successful edit
        })
        .catch((error) => {
          console.error("Failed to update product: ", error);
        });
    } else {
      navigate("/:lang/products"); // No changes made, navigate back
      console.log("FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF");
    }
  };

  return (
    <div>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl font-bold text-center mb-6">Edit Product</h1>
        {error && (
          <div className="text-red-600 text-center mb-4">
            Error loading categories: {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full py-2 px-4 border rounded focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="used">Used</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
          {loading ? (
            <div className="text-center text-gray-700">
              Loading categories...
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categories
              </label>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((category) => (
                  <div key={category._id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="categories"
                      value={category._id}
                      id={category._id}
                      checked={formData.categories.includes(category._id)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label htmlFor={category._id} className="text-gray-700">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
