import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  selectCategories,
  selectLoading,
  fetchCategories,
} from "../../features/categories/categoriesSlice";
import countryData from "country-telephone-data"; // Import data for countries
import Flag from "react-world-flags";
import ProductSmallCard from "./ProductSmallCard";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer for notifications
import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS

const AddProductPage = () => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const seller = user?._id;
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryData.allCountries[228]?.dialCode || ""
  );
  useEffect(() => {
    if (!user) {
      toast.warn(
        "You need to log in to add a product. Please log in or sign up to continue."
      );
    }
    dispatch(fetchCategories());
  }, [dispatch, user]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    condition: "used",
    seller: seller,
    price: "",
    location: {
      country: "",
      city: "",
      street: "",
      zipCode: "",
    },
    contactInfo: {
      phone: user?.phone || "",
      email: user?.email || "",
    },
    categories: [],
    favorite: false,
    images: [],
  });
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());

    // Fetch user's existing products
    const fetchUserProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/product/user/${seller}`
        );
        if (response.ok) {
          const products = await response.json();
          setUserProducts(products);
        } else {
          console.error("Failed to fetch user products");
        }
      } catch (error) {
        console.error("Error fetching user products:", error);
      }
    };

    fetchUserProducts();
  }, [dispatch, seller]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setProduct({ ...product, [name]: parseFloat(value) });
    } else if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      setProduct({
        ...product,
        location: { ...product.location, [key]: value },
      });
    } else if (name.startsWith("contactInfo.")) {
      const key = name.split(".")[1];
      setProduct({
        ...product,
        contactInfo: { ...product.contactInfo, [key]: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setProduct({ ...product, categories: [...product.categories, value] });
    } else {
      setProduct({
        ...product,
        categories: product.categories.filter((cat) => cat !== value),
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProduct({ ...product, images: imageUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must log in before adding a product.");
      return;
    }
    // Validate phone number before submitting
    const sellerPhoneNumber = `+${selectedCountryCode}${product.contactInfo.phone.trim()}`;
    console.log("this is phone number:", sellerPhoneNumber);
    if (!sellerPhoneNumber || !product.contactInfo.phone.trim()) {
      toast.error("Phone number can not be empty!!");
      return;
    }

    // Ensure the phone number contains only digits
    const phoneRegex = /^[0-9]+$/;
    if (!phoneRegex.test(sellerPhoneNumber.replace(/^\+/, ""))) {
      toast.error("Phone number can only contain numbers.");
      return;
    }

    // Optional: Check the length of the phone number based on the country code
    // Example: Check for common phone number lengths (this could vary for each country)
    const phoneLength = sellerPhoneNumber.length;
    if (phoneLength < 10 || phoneLength > 15) {
      toast.error("Phone number is too short or too long.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: product.name,
            description: product.description,
            condition: product.condition,
            price: {
              amount: parseFloat(product.price),
            },
            seller: seller,
            category: product.categories,
            images: product.images,
            location: product.location,
            contactInfo: {
              ...product.contactInfo,
              phone: sellerPhoneNumber,
            },
          }),
        }
      );
      console.log("this is the respose of post fetch: ", response);
      if (response.ok) {
        const newProduct = await response.json();
        setUserProducts([...userProducts, newProduct]);
        toast.success("Product created successfully!");
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the product.");
    }
    setUserProducts([...userProducts, product]);
    setProduct({
      name: "",
      description: "",
      condition: "used",
      seller: seller,
      price: "",
      location: {
        country: "",
        city: "",
        street: "",
        zipCode: "",
      },
      contactInfo: {
        phone: user?.phone || "",
        email: user?.email || "",
      },
      categories: [],
      availability: "available",
      favorite: false,
      images: [],
    });
  };

  // Create options from country data
  const countryOptions = countryData.allCountries.map((country) => ({
    value: country.dialCode,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Flag
          code={country.iso2}
          style={{ width: "20px", height: "15px", marginRight: "5px" }}
        />
        +{country.dialCode}
      </div>
    ),
    flag: country.iso2, // This is useful if you want to use the flag elsewhere
  }));

  // the phone number correct format
  const formatPhoneNumberCustom = (phoneNumber) => {
    // Assuming the number includes the country code and needs to be formatted like: +90 534 773 12 12
    const cleaned = phoneNumber.replace(/\D+/g, ""); // Remove non-digit characters
    const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
    if (match) {
      return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return phoneNumber; // Return as-is if it doesn't match the expected pattern
  };

  return (
    <div className="flex flex-col w-full h-full p-6">
      <ToastContainer /> {/* Include ToastContainer to show notifications */}
      <div className="flex flex-row w-full mb-6 h-1/2">
        {/* Right Side Form */}
        <div className="w-1/2 p-4">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              placeholder="Product Name"
              className="p-2 border border-gray-300 rounded"
            />
            <textarea
              name="description"
              value={product.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="condition"
              value={product.condition}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="used">Used</option>
              <option value="new">New</option>
              <option value="like new">Like New</option>
              <option value="like new">Damaged</option>
            </select>
            <input
              type="text"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.country"
              value={product.location.country}
              onChange={handleInputChange}
              placeholder="Country"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.city"
              value={product.location.city}
              onChange={handleInputChange}
              placeholder="City"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.street"
              value={product.location.street}
              onChange={handleInputChange}
              placeholder="Street"
              className="p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="location.zipCode"
              value={product.location.zipCode}
              onChange={handleInputChange}
              placeholder="Zip Code"
              className="p-2 border border-gray-300 rounded"
            />
            {/* Phone number */}
            <div>
              <label htmlFor="phone">Phone Number:</label>
              <div style={{ display: "flex", alignItems: "center" }}>
                {/* Country Code Dropdown */}
                <Select
                  options={countryOptions}
                  defaultValue={countryOptions[228]}
                  value={countryOptions.find(
                    (option) => option.value === selectedCountryCode
                  )}
                  onChange={(selectedOption) => {
                    setSelectedCountryCode(selectedOption.value); // Update selectedCountryCode
                  }}
                />
                {/* Phone Number Input */}
                <input
                  type="tel"
                  id="phone"
                  placeholder="Enter phone number"
                  name="contactInfo.phone"
                  value={product.contactInfo.phone}
                  onChange={(e) => handleInputChange(e)}
                  maxLength={17} // Limit input length to match the full format
                  style={{ padding: "10px", fontSize: "16px", width: "300px" }}
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            </div>
            <input
              type="email"
              name="contactInfo.email"
              value={product.contactInfo.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="p-2 border border-gray-300 rounded"
            />
            {loading ? (
              <div className="text-center text-gray-700">
                Loading categories...
              </div>
            ) : (
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
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
                        onChange={handleCategoryChange}
                        className="mr-2 focus:ring-2 focus:ring-blue-500"
                      />
                      <label htmlFor={category._id} className="text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded"
            />
            <select
              name="availability"
              value={product.availability}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="available">Available</option>
              <option value="not available">Not Available</option>
              <option value="sold">Sold</option>
            </select>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Left Side Preview */}
        <div className="w-1/2 p-4 border-l border-gray-300">
          <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative">
            <div className="absolute top-2 right-2">
              <FaHeart
                className={`text-red-500 cursor-pointer hover:text-red-700 transition duration-300 ${
                  product.favorite ? "text-red-700" : ""
                }`}
              />
            </div>
            <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {product.availability === "available"
                ? "Available"
                : product.availability === "sold"
                ? "Sold Out"
                : "Not Available"}
            </div>
            <div className="flex justify-center items-center h-56 bg-gray-200">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-500 text-lg">
                  {product.name || "Product Name"}
                </span>
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                {product.name || "Product Name"}
              </h2>
              <p className="text-gray-900 text-2xl font-bold mb-4">
                <span>₺</span>
                {product.price || "0.00"}
              </p>
              <p className="text-gray-700 mb-2 truncate">
                {product.description || "No description available"}
              </p>
              <p className="text-gray-500">Seller: {user?.name || "Unknown"}</p>
              <p className="text-gray-500">
                Condition: {product.condition || "Unknown"}
              </p>
              <p className="text-gray-500">
                Categories:{" "}
                {product.categories.length > 0
                  ? product.categories
                      .map(
                        (catId) =>
                          categories.find((cat) => cat._id === catId)?.name ||
                          catId
                      )
                      .join(", ")
                  : "None"}
              </p>
              <p className="text-gray-500">
                Contact Info:{" "}
                {`
                ${
                  product.contactInfo.phone
                    ? "Phone: " +
                      formatPhoneNumberCustom(
                        selectedCountryCode + product.contactInfo.phone
                      ) +
                      ", "
                    : ""
                }
                ${
                  product.contactInfo.email
                    ? "Email: " + product.contactInfo.email
                    : ""
                }`.replace(/,\s*$/, "") || "Contact Info not provided"}
              </p>
              <p className="text-gray-500">
                Location:{" "}
                {`${
                  product.location.street ? product.location.street + ", " : ""
                }${product.location.city ? product.location.city + ", " : ""}${
                  product.location.country
                    ? product.location.country + ", "
                    : ""
                }${product.location.zipCode || ""}`.replace(/,\s*$/, "") ||
                  "Location not provided"}
              </p>
            </div>
            <div className="flex justify-between items-center p-4 border-t">
              <p className="text-xs text-gray-500">
                ID: {product.customId || "N/A"}
              </p>
              <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
                Report Product
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* User Products Section */}
      <div className="w-full  overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Your Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {userProducts.map((product, index) => (
            <ProductSmallCard key={product._id || index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
