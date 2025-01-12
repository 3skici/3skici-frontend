import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import {
  selectCategories,
  selectLoading,
  fetchCategories,
} from "../../features/categories/categoriesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryData from "country-telephone-data"; // Import data for countries
import Flag from "react-world-flags";
const AddProductPage = () => {
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const seller = user?._id;
  const [selectedCountryCode, setSelectedCountryCode] = useState(
    countryData.allCountries[228]?.dialCode || ""
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [product, setProduct] = useState({
    name: "", // ✅ FIXED
    description: "", // ✅ FIXED
    condition: "used",
    seller: seller,
    price: { amount: "", currency: "TL" },
    location: { country: "", city: "", street: "", zipCode: "" },
    contactInfo: { phone: user?.phone || "", email: user?.email || "" },
    categories: [], // ✅ RESTORED
    availability: "available",
    favorite: false,
    images: [],
    imagesFiles: [],
  });
  // const [userProducts, setUserProducts] = useState([]);

  // useEffect(() => {
  //   dispatch(fetchCategories());

  //   // Fetch user's existing products
  //   const fetchUserProducts = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.REACT_APP_API_URL}/product/user-product/${seller}`
  //       );
  //       if (response.ok) {
  //         const products = await response.json();
  //         setUserProducts(products);
  //       } else {
  //         console.error("Failed to fetch user products");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user products:", error);
  //     }
  //   };

  //   fetchUserProducts();
  // }, [dispatch, seller]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: name === "price.amount" ? parseFloat(value) : value,
          },
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleCategoryChange = (selectedCategories) => {
    setProduct({
      ...product,
      categories: selectedCategories.map((cat) => cat.value),
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.filter((file) =>
      product.imagesFiles.every(
        (existingFile) => existingFile.name !== file.name
      )
    );

    if (newFiles.length > 0) {
      setProduct((prev) => ({
        ...prev,
        imagesFiles: [...prev.imagesFiles, ...newFiles],
        images: [
          ...prev.images,
          ...newFiles.map((file) => URL.createObjectURL(file)),
        ],
      }));
    } else {
      toast.warn("Duplicate images are not allowed.");
    }
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
      // Create a FormData object
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("condition", product.condition);
      formData.append("price.amount", product.price.amount);
      formData.append("price.currency", product.price.currency);
      formData.append("seller", seller);
      formData.append("contactInfo.phone", sellerPhoneNumber);
      formData.append("contactInfo.email", product.contactInfo.email);
      formData.append("availability", product.availability);

      // append categories as an array
      product.categories.forEach((category) =>
        formData.append("categories", category)
      );

      // Append location fields
      formData.append("location.country", product.location.country);
      formData.append("location.city", product.location.city);
      formData.append("location.street", product.location.street);
      formData.append("location.zipCode", product.location.zipCode);

      // append files
      if (product.imagesFiles && product.imagesFiles.length > 0) {
        product.imagesFiles.forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/product/add`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      if (response.ok) {
        const { data: newProduct } = await response.json();
        // setUserProducts([...userProducts, newProduct]);
        toast.success("Product created successfully!");
      } else {
        const errorResponse = await response.json();
        toast.error(errorResponse.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the product.");
    }
    setProduct({
      name: "",
      description: "",
      condition: "used",
      seller: seller,
      price: {
        amount: "",
        currency: "TL",
      },
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
      imagesFiles: [],
    });
  };

  // Create options from country data
  const countryOptions = countryData.allCountries.map((country) => ({
    value: country.dialCode,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Flag
          code={country.iso2}
          style={{ width: "20px", height: "2rem", marginRight: "5px" }}
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

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      product.images.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [product.images]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
      <div className="max-w-5xl mx-auto">
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              🛍️ Add New Product
            </h2>
            <div className="flex gap-2">
              {/* <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg">
                💾 Save Draft
              </button> */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Panel */}
            <div className="col-span-2 space-y-6">
              {/* General Information */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">
                  📋 General Information
                </h3>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleInputChange}
                  placeholder="Product Name"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                />
                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4 h-24"
                ></textarea>

                <label className="block font-medium text-gray-700">
                  Condition
                </label>
                <select
                  name="condition"
                  value={product.condition}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="used">Used</option>
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="damaged">Damaged</option>
                </select>

                {/* availability */}
                <label className="block font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="availability"
                  value={product.availability}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                >
                  <option value="available">Available</option>
                  <option value="not available">Not Available</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              {/* Pricing and Stock */}
              <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold">
                    💰 Base Pricing
                  </label>
                  <input
                    name="price.amount"
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={product.price.amount || ""}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Curreny
                  </label>
                  <select
                    name="price.currency"
                    value={product.price.currency}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  >
                    <option value="USD">USD</option>
                    <option value="TL">TL</option>
                  </select>
                </div>
              </div>

              {/* Category Selection (✅ RESTORED) */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">📂 Category</h3>
                <Select
                  options={categories.map((cat) => ({
                    value: cat._id,
                    label: cat.name,
                  }))}
                  isMulti
                  onChange={handleCategoryChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Panel */}
            <div className="space-y-6">
              {/* Image Upload */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">📸 Upload Images</h3>
                <input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full p-2 border rounded-lg"
                />
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {product.images.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-md border"
                    />
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white p-6 rounded-lg shadow relative mt-2 max-w-xs">
                <div className="relative w-full">
                  <h3 className="text-lg font-semibold mb-4">
                    📞 Contact Information
                  </h3>

                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    {/* Country Code Selector */}
                    <div className="flex items-center absolute inset-y-0 my-auto h-6 mt-14 border-r px-2 bg-gray-100">
                      <Select
                        options={countryOptions}
                        defaultValue={countryOptions[228]} // Default value for selected country
                        value={countryOptions.find(
                          (option) => option.value === selectedCountryCode
                        )}
                        onChange={(selectedOption) => {
                          setSelectedCountryCode(selectedOption.value); // Update selected country code
                        }}
                        className="w-[115px] text-sm bg-transparent outline-none"
                      />
                    </div>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      id="phone"
                      name="contactInfo.phone"
                      value={product.contactInfo.phone}
                      maxLength={10}
                      onChange={handleInputChange}
                      placeholder="Phone Number"
                      className="flex-1 pl-[9rem] pr-3 py-2 outline-none mb-2 bg-white"
                    />
                  </div>
                </div>

                <input
                  type="email"
                  name="contactInfo.email"
                  value={product.contactInfo.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className="w-full p-3 border mt-2 border-gray-300 rounded-lg"
                />
              </div>
              <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold">
                    🌍 Country
                  </label>
                  <input
                    name="location.country"
                    value={product.location.country}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    🏙️ City
                  </label>
                  <input
                    name="location.city"
                    value={product.location.city}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    🏠 Street
                  </label>
                  <input
                    name="location.street"
                    value={product.location.street}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold">
                    📮 ZIP Code
                  </label>
                  <input
                    name="location.zipCode"
                    value={product.location.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 text-white  rounded-lg hover:bg-emerald-600"
                >
                  ✅ Add Product
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;

// import React, { useEffect, useState } from "react";
// import { FaHeart } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
// import {
//   selectCategories,
//   selectLoading,
//   fetchCategories,
// } from "../../features/categories/categoriesSlice";
// import countryData from "country-telephone-data"; // Import data for countries
// import Flag from "react-world-flags";
// import ProductSmallCard from "./ProductSmallCard";
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer for notifications
// import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS

// const AddProductPage = () => {
//   const categories = useSelector(selectCategories);
//   const loading = useSelector(selectLoading);
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const token = useSelector((state) => state.auth.token);
//   const seller = user?._id;
//   const [selectedCountryCode, setSelectedCountryCode] = useState(
//     countryData.allCountries[228]?.dialCode || ""
//   );
//   useEffect(() => {
//     if (!user) {
//       toast.warn(
//         "You need to log in to add a product. Please log in or sign up to continue."
//       );
//     }
//     dispatch(fetchCategories());
//   }, [dispatch, user]);

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     condition: "used",
//     seller: seller,
//     price: {
//       amount: "",
//       currency: "TL",
//     },
//     location: {
//       country: "",
//       city: "",
//       street: "",
//       zipCode: "",
//     },
//     contactInfo: {
//       phone: user?.phone || "",
//       email: user?.email || "",
//     },
//     categories: [],
//     favorite: false,
//     images: [],
//     imagesFiles: [],
//   });
//   const [userProducts, setUserProducts] = useState([]);

//   useEffect(() => {
//     dispatch(fetchCategories());

//     // Fetch user's existing products
//     const fetchUserProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/product/user-product/${seller}`
//         );
//         if (response.ok) {
//           const products = await response.json();
//           setUserProducts(products);
//         } else {
//           console.error("Failed to fetch user products");
//         }
//       } catch (error) {
//         console.error("Error fetching user products:", error);
//       }
//     };

//     fetchUserProducts();
//   }, [dispatch, seller]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "price.amount") {
//       setProduct({
//         ...product,
//         price: { ...product.price, amount: parseFloat(value) },
//       });
//     } else if (name === "price.currency") {
//       setProduct({
//         ...product,
//         price: { ...product.price, currency: value },
//       });
//     } else if (name.startsWith("location.")) {
//       const key = name.split(".")[1];
//       setProduct({
//         ...product,
//         location: { ...product.location, [key]: value },
//       });
//     } else if (name.startsWith("contactInfo.")) {
//       const key = name.split(".")[1];
//       setProduct({
//         ...product,
//         contactInfo: { ...product.contactInfo, [key]: value },
//       });
//     } else {
//       setProduct({ ...product, [name]: value });
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setProduct({ ...product, categories: [...product.categories, value] });
//     } else {
//       setProduct({
//         ...product,
//         categories: product.categories.filter((cat) => cat !== value),
//       });
//     }
//   };

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newFiles = files.filter((file) => {
//       return !product.imagesFiles.some(
//         (existingFile) =>
//           existingFile.name === file.name && existingFile.size === file.size
//       );
//     });

//     if (newFiles.length > 0) {
//       const newImagePreviews = newFiles.map((file) => ({
//         file,
//         preview: URL.createObjectURL(file),
//       }));

//       setProduct({
//         ...product,
//         imagesFiles: [...product.imagesFiles, ...newFiles],
//         images: [...product.images, ...newImagePreviews],
//       });
//     } else {
//       toast.warn("Duplicate images are not allowed.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error("You must log in before adding a product.");
//       return;
//     }
//     // Validate phone number before submitting
//     const sellerPhoneNumber = `+${selectedCountryCode}${product.contactInfo.phone.trim()}`;
//     console.log("this is phone number:", sellerPhoneNumber);
//     if (!sellerPhoneNumber || !product.contactInfo.phone.trim()) {
//       toast.error("Phone number can not be empty!!");
//       return;
//     }

//     // Ensure the phone number contains only digits
//     const phoneRegex = /^[0-9]+$/;
//     if (!phoneRegex.test(sellerPhoneNumber.replace(/^\+/, ""))) {
//       toast.error("Phone number can only contain numbers.");
//       return;
//     }

//     // Optional: Check the length of the phone number based on the country code
//     // Example: Check for common phone number lengths (this could vary for each country)
//     const phoneLength = sellerPhoneNumber.length;
//     if (phoneLength < 10 || phoneLength > 15) {
//       toast.error("Phone number is too short or too long.");
//       return;
//     }

//     try {
//       // Create a FormData object
//       const formData = new FormData();
//       formData.append("name", product.name);
//       formData.append("description", product.description);
//       formData.append("condition", product.condition);
//       formData.append("price.amount", product.price.amount);
//       formData.append("price.currency", product.price.currency);
//       formData.append("seller", seller);
//       formData.append("contactInfo.phone", sellerPhoneNumber);
//       formData.append("contactInfo.email", product.contactInfo.email);
//       formData.append("availability", product.availability);

//       // append categories as an array
//       product.categories.forEach((category) =>
//         formData.append("categories", category)
//       );

//       // Append location fields
//       formData.append("location.country", product.location.country);
//       formData.append("location.city", product.location.city);
//       formData.append("location.street", product.location.street);
//       formData.append("location.zipCode", product.location.zipCode);

//       // append files
//       if (product.imagesFiles && product.imagesFiles.length > 0) {
//         product.imagesFiles.forEach((file) => {
//           formData.append("files", file);
//         });
//       }

//       const response = await fetch(
//         `${process.env.REACT_APP_API_URL}/product/add`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );
//       console.log("this is the respose of post fetch: ", response);
//       if (response.ok) {
//         const { data: newProduct } = await response.json();
//         setUserProducts([...userProducts, newProduct]);
//         toast.success("Product created successfully!");
//       } else {
//         const errorResponse = await response.json();
//         toast.error(errorResponse.message || "Failed to add product.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("An error occurred while adding the product.");
//     }
//     setProduct({
//       name: "",
//       description: "",
//       condition: "used",
//       seller: seller,
//       price: {
//         amount: "",
//         currency: "TL",
//       },
//       location: {
//         country: "",
//         city: "",
//         street: "",
//         zipCode: "",
//       },
//       contactInfo: {
//         phone: user?.phone || "",
//         email: user?.email || "",
//       },
//       categories: [],
//       availability: "available",
//       favorite: false,
//       images: [],
//       imagesFiles: [],
//     });
//   };

//   // Create options from country data
//   const countryOptions = countryData.allCountries.map((country) => ({
//     value: country.dialCode,
//     label: (
//       <div style={{ display: "flex", alignItems: "center" }}>
//         <Flag
//           code={country.iso2}
//           style={{ width: "20px", height: "2rem", marginRight: "5px" }}
//         />
//         +{country.dialCode}
//       </div>
//     ),
//     flag: country.iso2, // This is useful if you want to use the flag elsewhere
//   }));

//   // the phone number correct format
//   const formatPhoneNumberCustom = (phoneNumber) => {
//     // Assuming the number includes the country code and needs to be formatted like: +90 534 773 12 12
//     const cleaned = phoneNumber.replace(/\D+/g, ""); // Remove non-digit characters
//     const match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/);
//     if (match) {
//       return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
//     }
//     return phoneNumber; // Return as-is if it doesn't match the expected pattern
//   };

//   // Cleanup object URLs to prevent memory leaks
//   useEffect(() => {
//     return () => {
//       product.images.forEach((url) => URL.revokeObjectURL(url));
//     };
//   }, [product.images]);

//   return (
//     <div className="flex flex-col w-full h-full p-6">
//       <ToastContainer /> {/* Include ToastContainer to show notifications */}
//       <div className="flex flex-row w-full mb-6 h-1/2">
//         {/* Right Side Form */}
//         <div className="w-1/2 p-4">
//           <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
//             <input
//               type="text"
//               name="name"
//               value={product.name}
//               onChange={handleInputChange}
//               placeholder="Product Name"
//               className="p-2 border border-gray-300 rounded"
//             />

//             <div>
//               <label className="font-medium">Description</label>
//               <textarea
//                 name="description"
//                 value={product.description}
//                 onChange={handleInputChange}
//                 placeholder="Description"
//                 className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//               ></textarea>
//             </div>
//             <select
//               name="condition"
//               value={product.condition}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="used">Used</option>
//               <option value="new">New</option>
//               <option value="like new">Like New</option>
//               <option value="like new">Damaged</option>
//             </select>
//             <div className="relative mt-2 max-w-xs text-gray-500">
//               <div className="absolute inset-y-0 left-3 flex items-center">
//                 <select
//                   name="price.currency"
//                   value={product.price.currency}
//                   onChange={handleInputChange}
//                   className="text-sm bg-transparent outline-none rounded-lg h-full"
//                 >
//                   <option value="USD">USD</option>
//                   <option value="TL">TL</option>
//                 </select>
//               </div>
//               <input
//                 name="price.amount"
//                 value={product.price.amount}
//                 onChange={handleInputChange}
//                 type="number"
//                 placeholder="0.00"
//                 className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//                 min="0"
//                 step="0.01"
//               />
//             </div>
//             <input
//               type="text"
//               name="location.country"
//               value={product.location.country}
//               onChange={handleInputChange}
//               placeholder="Country"
//               className="p-2 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               name="location.city"
//               value={product.location.city}
//               onChange={handleInputChange}
//               placeholder="City"
//               className="p-2 border border-gray-300 rounded"
//             />
//             <input
//               type="text"
//               name="location.street"
//               value={product.location.street}
//               onChange={handleInputChange}
//               placeholder="Street"
//               className="p-2 border border-gray-300 rounded"
//             />

//             {/* zip code */}
//             <div>
//               <label
//                 for="zip-input"
//                 className="block mb-2 text-sm font-medium text-gray-900 "
//               >
//                 ZIP code:
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
//                   <svg
//                     className="w-4 h-4 text-gray-500 dark:text-gray-400"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="currentColor"
//                     viewBox="0 0 16 20"
//                   >
//                     <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   id="zip-input"
//                   name="location.zipCode"
//                   value={product.location.zipCode}
//                   onChange={handleInputChange}
//                   aria-describedby="helper-text-explanation"
//                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                   placeholder="12345 or 12345-6789"
//                   pattern="^\d{5}(-\d{4})?$"
//                   required
//                 />
//               </div>
//               <p
//                 id="helper-text-explanation"
//                 className="mt-2 text-sm text-gray-500 dark:text-gray-400"
//               >
//                 Please select a 5 digit number from 0 to 9.
//               </p>
//             </div>

//             {/* Phone number */}
//             <div>
//               <label htmlFor="phone">Phone number</label>
//               <div className="relative mt-2 max-w-xs text-gray-500">
//                 {/* Country Code Dropdown */}
//                 <div className="absolute inset-y-0 my-auto h-6 flex items-center border-r ">
//                   <Select
//                     options={countryOptions}
//                     defaultValue={countryOptions[228]} // Default value for selected country
//                     value={countryOptions.find(
//                       (option) => option.value === selectedCountryCode
//                     )}
//                     onChange={(selectedOption) => {
//                       setSelectedCountryCode(selectedOption.value); // Update selected country code
//                     }}
//                     className="text-sm bg-transparent outline-none"
//                   />
//                 </div>

//                 {/* Phone Number Input */}
//                 <input
//                   type="tel"
//                   id="phone"
//                   placeholder="+1 (555) 000-000"
//                   name="contactInfo.phone"
//                   value={product.contactInfo.phone}
//                   onChange={(e) => handleInputChange(e)}
//                   maxLength={17} // Limit input length to match the full format
//                   className="w-full pl-[8rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//                 />
//               </div>
//             </div>

//             {/* email */}
//             <div className="relative max-w-xs">
//               <svg
//                 className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
//                 />
//               </svg>
//               <input
//                 value={product.contactInfo.email}
//                 onChange={handleInputChange}
//                 type="email"
//                 name="contactInfo.email"
//                 placeholder="Enter your email"
//                 className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
//               />
//             </div>
//             {loading ? (
//               <div className="text-center text-gray-700">
//                 Loading categories...
//               </div>
//             ) : (
//               <div>
//                 <label className="block text-gray-800 font-semibold mb-2">
//                   Categories
//                 </label>
//                 <div className="grid grid-cols-2 gap-4">
//                   {categories.map((category) => (
//                     <div key={category._id} className="flex items-center">
//                       <input
//                         type="checkbox"
//                         name="categories"
//                         value={category._id}
//                         id={category._id}
//                         onChange={handleCategoryChange}
//                         className="mr-2 focus:ring-2 focus:ring-blue-500"
//                       />
//                       <label htmlFor={category._id} className="text-gray-700">
//                         {category.name}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <input
//               type="file"
//               multiple
//               onChange={handleImageChange}
//               className="p-2 border border-gray-300 rounded"
//             />
//             <div>
//               {product.images.map((image, index) => (
//                 <div key={index}>
//                   <img
//                     src={image.preview}
//                     alt={`Preview ${index}`}
//                     style={{ width: "100px", height: "100px" }}
//                   />
//                 </div>
//               ))}
//             </div>

//             {/* availability */}
//             <select
//               name="availability"
//               value={product.availability}
//               onChange={handleInputChange}
//               className="p-2 border border-gray-300 rounded"
//             >
//               <option value="available">Available</option>
//               <option value="not available">Not Available</option>
//               <option value="sold">Sold</option>
//             </select>

//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-500 text-white rounded"
//             >
//               Add Product
//             </button>
//           </form>
//         </div>

//         {/* Left Side Preview */}
//         <div className="w-1/2 p-4 border-l border-gray-300">
//           <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white relative">
//             <div className="absolute top-2 right-2">
//               <FaHeart
//                 className={`text-red-500 cursor-pointer hover:text-red-700 transition duration-300 ${
//                   product.favorite ? "text-red-700" : ""
//                 }`}
//               />
//             </div>
//             <div className="absolute top-2 left-2 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-semibold">
//               {product.availability === "available"
//                 ? "Available"
//                 : product.availability === "sold"
//                 ? "Sold Out"
//                 : "Not Available"}
//             </div>
//             <div className="flex justify-center items-center h-56 bg-gray-200">
//               {product.images && product.images.length > 0 ? (
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="object-cover w-full h-full"
//                 />
//               ) : (
//                 <span className="text-gray-500 text-lg">
//                   {product.name || "Product Name"}
//                 </span>
//               )}
//             </div>
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
//                 {product.name || "Product Name"}
//               </h2>
//               <p className="text-gray-900 text-2xl font-bold mb-4">
//                 {/* <span>₺</span> */}
//                 <span>{product.price.currency}</span>
//                 {product.price.amount || "0.00"}
//               </p>
//               <p className="text-gray-700 mb-2 truncate">
//                 {product.description || "No description available"}
//               </p>
//               <p className="text-gray-500">Seller: {user?.name || "Unknown"}</p>
//               <p className="text-gray-500">
//                 Condition: {product.condition || "Unknown"}
//               </p>
//               <p className="text-gray-500">
//                 Categories:{" "}
//                 {product.categories.length > 0
//                   ? product.categories
//                       .map(
//                         (catId) =>
//                           categories.find((cat) => cat._id === catId)?.name ||
//                           catId
//                       )
//                       .join(", ")
//                   : "None"}
//               </p>
//               <p className="text-gray-500">
//                 Contact Info:{" "}
//                 {`
//                 ${
//                   product.contactInfo.phone
//                     ? "Phone: " +
//                       formatPhoneNumberCustom(
//                         selectedCountryCode + product.contactInfo.phone
//                       ) +
//                       ", "
//                     : ""
//                 }
//                 ${
//                   product.contactInfo.email
//                     ? "Email: " + product.contactInfo.email
//                     : ""
//                 }`.replace(/,\s*$/, "") || "Contact Info not provided"}
//               </p>
//               <p className="text-gray-500">
//                 Location:{" "}
//                 {`${
//                   product.location.street ? product.location.street + ", " : ""
//                 }${product.location.city ? product.location.city + ", " : ""}${
//                   product.location.country
//                     ? product.location.country + ", "
//                     : ""
//                 }${product.location.zipCode || ""}`.replace(/,\s*$/, "") ||
//                   "Location not provided"}
//               </p>
//             </div>
//             <div className="flex justify-between items-center p-4 border-t">
//               <p className="text-xs text-gray-500">
//                 ID: {product.customId || "N/A"}
//               </p>
//               <button className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300">
//                 Report Product
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* User Products Section */}
//       <div className="w-full  overflow-y-auto">
//         <h2 className="text-lg font-bold mb-4">Your Products</h2>
//         <div className="grid grid-cols-4 gap-4">
//           {userProducts.map((product, index) => (
//             <ProductSmallCard key={product._id || index} product={product} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;
