import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  selectCategories,
  selectLoading,
  selectError,
  fetchCategories,
} from "../../features/categories/categoriesSlice";
import {
  fetchProducts,
  updateProduct,
} from "../../features/products/productsSlice";
const EditProduct = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) => state.products.items);

  console.log(product);

  const productToBeEdit = useSelector((state) => state);
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: {
      amount: product?.price?.amount || "",
      currency: product?.price?.currency || "TL",
    },
    condition: "used",
    location: {
      country: "",
      city: "",
      street: "",
      zipCode: "",
    },
    contactInfo: {
      phone: "",
      email: "",
    },
    categories: [],
    images: [],
    imagesFiles: [],
  });

  useEffect(() => {
    if (productToBeEdit) {
      setFormData({
        name: productToBeEdit.name || "",
        description: productToBeEdit.description || "",
        price: productToBeEdit.price || "",
        condition: productToBeEdit.condition || "used",
        categories: productToBeEdit.categories || [],
      });
    }
  }, [productToBeEdit]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, productId]);

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
    if (!productToBeEdit) {
      console.error("Product to edit not found.");
      return;
    }
    const updatedData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key] !== productToBeEdit[key]) {
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
          <div className="relative mt-2 max-w-xs text-gray-500">
            <div className="absolute inset-y-0 left-3 flex items-center">
              <select
                name="price.currency"
                value={product.price.currency}
                onChange={handleChange}
                className="text-sm bg-transparent outline-none rounded-lg h-full"
              >
                <option value="USD">USD</option>
                <option value="TL">TL</option>
              </select>
            </div>
            <input
              name="price.amount"
              value={product.price.amount}
              onChange={handleChange}
              type="number"
              placeholder="0.00"
              className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <select
              name="condition"
              value={product.condition}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="used">Used</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="like new">Damaged</option>
            </select>
          </div>
          {/* location */}
          <div>
            <input
              type="text"
              name="location.country"
              value={product.location.country}
              onChange={handleChange}
              placeholder="Country"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.city"
              value={product.location.city}
              onChange={handleChange}
              placeholder="City"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.street"
              value={product.location.street}
              onChange={handleChange}
              placeholder="Street"
              className="p-2 border border-gray-300 rounded"
            />

            {/* zip code */}
            <div>
              <label
                for="zip-input"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                ZIP code:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 20"
                  >
                    <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="zip-input"
                  name="location.zipCode"
                  value={product.location.zipCode}
                  onChange={handleChange}
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="12345 or 12345-6789"
                  pattern="^\d{5}(-\d{4})?$"
                  required
                />
              </div>
              <p
                id="helper-text-explanation"
                className="mt-2 text-sm text-gray-500 dark:text-gray-400"
              >
                Please select a 5 digit number from 0 to 9.
              </p>
            </div>
          </div>
          {/* contact info */}
          <div></div>
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
