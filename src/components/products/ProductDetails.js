import React, { useState } from "react";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { FaCopy, FaTags } from "react-icons/fa";
import { format } from "timeago.js";
import { Link, useNavigate } from "react-router-dom";
import i18n from "../../i18n";
import { getPathWithLanguage } from "../../utils/pathHelpers";
import { selectCategories } from "../../features/categories/categoriesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  addOrUpdateChat,
  selectChat,
  setChatMessages,
} from "../../features/chat/chatSlice";
import { getImageUrl } from "../../utils/imgagesHelper";

const Product = ({ suggestedProducts = [] }) => {
  const product = useSelector((state) => state.products.selectedProduct);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const productId = product.customId || product._id || "N/A";
  const categories = useSelector(selectCategories);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const handleFavoriteClick = () => setIsFavorited((prev) => !prev);
  const navigate = useNavigate();
  const postedTime = format(new Date(product.createdAt));
  const currentLanguage = i18n.language;
  const chatRoom = getPathWithLanguage(`/chat `, currentLanguage);
  const user = useSelector((state) => state.auth.user?._id);
  const [isLoading, setIsLoading] = useState(false);

  const handleChatClick = async (e) => {
    e.stopPropagation();
    if (!token) {
      e.preventDefault();
      return toast.error("You need to log in to chat with the seller.");
    }
    if (token) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/chat/initiate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              participants: [user, product.seller._id],
              productId: product.customId,
            }),
          }
        );
        const data = await response.json();
        if (response.ok) {
          const { chat, messages } = data;
          const chatId = chat?._id;
          dispatch(addOrUpdateChat(chat));
          dispatch(selectChat(chatId));
          dispatch(setChatMessages({ chatId, messages }));
          setIsLoading(false);
          navigate(chatRoom);
        } else {
          e.preventDefault();
          toast.error(data.message || "An error occurred");
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(productId);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col min-h-[500px] bg-white rounded-lg shadow-lg p-8 max-w-8xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <img
              src={getImageUrl(product.images[selectedImage])}
              alt="Selected Product"
              className="w-full h-96 object-contain rounded-lg"
            />
            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((imagePath, index) => (
                <img
                  key={index}
                  src={getImageUrl(imagePath)}
                  alt="Thumbnail"
                  className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full h-auto md:w-1/2 p-10">
            <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
            <p className="text-gray-600 mb-4 text-xl">{product.description}</p>
            <p className="text-gray-800 font-semibold text-lg mb-2">
              ${product.price.amount}
            </p>
            <div className="flex flex-col mt-4  text-gray-700">
              <p>
                <strong>Condition:</strong> {product.condition}
              </p>
              <p>
                <strong>Location:</strong> {product.location.city},{" "}
                {product.location.street}, {product.location.zipCode}
              </p>
              <p>
                <strong>Seller:</strong> {product.seller.username} (
                {product.seller.email})
              </p>
              <p>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${product.contactInfo.email}`}
                  className="text-blue-600"
                >
                  {product.contactInfo.email}
                </a>
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href={`tel:${product.contactInfo.phone}`}
                  className="text-green-600"
                >
                  {product.contactInfo.phone}
                </a>
              </p>
              <p>
                <strong>Status:</strong> {product.status}
              </p>
              <p>
                <strong>Posted At:</strong> {postedTime}
              </p>
            </div>
            <div className="mt-6">
              <button
                onClick={handleChatClick}
                className="w-full bg-black text-white py-3 rounded-lg font-semibold"
              >
                Chat with Seller
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Suggested Products Section */}
      <hr></hr>
      <div className="p-4 bg-gray-50 rounded-md m-8  shadow-sm p-8 max-w-8xl mx-auto text-center">
        <h3 className="text-xl font-semibold mb-4">Suggested Products</h3>
        <div className="grid gap-4">
          {suggestedProducts.length > 0 ? (
            suggestedProducts.map((suggestedProduct, index) => (
              <div key={index} className="flex items-center">
                <img
                  src={
                    suggestedProduct.imageUrl ||
                    "https://via.placeholder.com/50"
                  }
                  alt={suggestedProduct.name || "Suggested product"}
                  className="w-16 h-16 rounded-md object-cover mr-3"
                />
                <div>
                  <h4 className="font-medium text-sm">
                    {suggestedProduct.name || "No name available"}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    <span>₺</span>
                    {suggestedProduct.price?.amount?.toFixed(2) || "0.00"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">
              No suggested products available.
            </p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import { useDispatch, useSelector } from "react-redux";
// import { FaCopy, FaTags } from "react-icons/fa";
// import { format } from "timeago.js";
// import { Link, useNavigate } from "react-router-dom";
// import i18n from "../../i18n";
// import { getPathWithLanguage } from "../../utils/pathHelpers";
// import { selectCategories } from "../../features/categories/categoriesSlice";
// import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import the ToastContainer CSS
// import {
//   addOrUpdateChat,
//   selectChat,
//   setChatMessages,
// } from "../../features/chat/chatSlice";
// import { getImageUrl } from "../../utils/imgagesHelper";

// const Product = ({ suggestedProducts = [] }) => {
//   const product = useSelector((state) => state.products.selectedProduct);
//   const [isFavorited, setIsFavorited] = useState(false);
//   const [copySuccess, setCopySuccess] = useState(false);
//   const productId = product.customId || product._id || "N/A"; // Fallback to _id
//   const categories = useSelector(selectCategories);
//   const token = useSelector((state) => state.auth.token);
//   const dispatch = useDispatch();
//   const handleFavoriteClick = () => setIsFavorited((prev) => !prev);
//   const navigate = useNavigate();
//   const postedTime = format(new Date(product.createdAt));

//   const currentLanguage = i18n.language;
//   const chatRoom = getPathWithLanguage(`/chat `, currentLanguage);
//   const user = useSelector((state) => state.auth.user?._id);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChatClick = async (e) => {
//     e.stopPropagation();
//     if (!token) {
//       e.preventDefault();
//       return toast.error("You need to log in to chat with the seller.");
//     }
//     if (token) {
//       setIsLoading(true);
//       try {
//         // Initiate chat session with API
//         const response = await fetch(
//           `${process.env.REACT_APP_API_URL}/chat/initiate`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//             body: JSON.stringify({
//               participants: [user, product.seller._id],
//               productId: product.customId,
//             }),
//           }
//         );

//         const data = await response.json();
//         if (response.ok) {
//           const { chat, messages } = data;

//           const chatId = chat?._id;

//           // Update Redux store:
//           // 1. Add or update the retrieved chat
//           dispatch(addOrUpdateChat(chat));
//           // 2. Set the selected chat to the newly retrieved/created one
//           dispatch(selectChat(chatId));

//           // 3. Set the messages for that chat
//           dispatch(setChatMessages({ chatId, messages }));

//           setIsLoading(false);
//           navigate(chatRoom);
//         } else {
//           e.preventDefault();
//           // If the backend returned a "Cannot create a chat with yourself" error
//           toast.error(data.message || "An error occurred");
//           setIsLoading(false);
//         }
//       } catch (error) {
//         setIsLoading(false);
//         // Handle error (e.g., show a message)
//       }
//     }
//   };

//   // copy code for copy the product id
//   const handleCopy = (product) => {
//     navigator.clipboard.writeText(productId);
//     setCopySuccess(true);
//     setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
//   };

//   // handle categories names
//   const getCategoryNames = (categoryIds) => {
//     if (!Array.isArray(categoryIds)) return "Not categorized";
//     return (
//       categoryIds
//         .map((id) => categories.find((category) => category._id === id)?.name)
//         .filter(Boolean)
//         .join(", ") || "Not categorized"
//     );
//   };

//   return (
//     <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden m-4">
//       {/* Product Image and Favorite Icon */}
//       <div className="relative md:w-1/3">
//         {/* cursor image */}
//         <div>
//           {/* Product Images Carousel */}
//           <div>
//             {product.images && product.images.length > 0 ? (
//               <Slider
//                 dots={true}
//                 infinite={true}
//                 speed={500}
//                 slidesToShow={1}
//                 slidesToScroll={1}
//               >
//                 {product.images.map((imagePath, index) => (
//                   <div key={index}>
//                     <img
//                       src={getImageUrl(imagePath)}
//                       alt={`${product.name} ${index + 1}`}
//                       className="w-full h-80 object-cover rounded"
//                       onError={(e) => {
//                         e.target.src = "https://via.placeholder.com/150";
//                       }}
//                       loading="lazy"
//                     />
//                   </div>
//                 ))}
//               </Slider>
//             ) : (
//               <img
//                 src="https://via.placeholder.com/150"
//                 alt="No product image"
//                 className="w-full h-56 object-cover rounded"
//               />
//             )}
//           </div>

//           <button
//             onClick={handleFavoriteClick}
//             className={`absolute top-2 right-2 bg-white p-2 rounded-full shadow-md transition-colors ${
//               isFavorited ? "text-red-500" : "text-gray-500"
//             }`}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               className="w-6 h-6 hover:text-red-500"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
//                 className={
//                   isFavorited ? "fill-current text-red-500" : "fill-transparent"
//                 }
//               />
//             </svg>
//           </button>
//         </div>
//         {/* Contact and Chat Buttons */}
//         <div className="flex justify-around mt-4 md:mt-6 p-2">
//           <Link
//             to={token ? chatRoom : "#"}
//             onClick={handleChatClick}
//             className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-colors"
//           >
//             {isLoading
//               ? "Loading..."
//               : user
//               ? "Chat with seller"
//               : "Please log in to chat"}
//           </Link>
//         </div>
//       </div>
//       {/* Product Info */}
//       <div className="md:w-1/3 w-full flex flex-col justify-between p-6 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
//         <div className="mb-5">
//           <h2 className="text-2xl font-extrabold text-gray-900 truncate mb-2">
//             {product?.name || "No product name available"}
//           </h2>
//           <p className="text-gray-600 text-base leading-relaxed">
//             {product?.description || "No description available."}
//           </p>
//         </div>

//         <div className="p-4 rounded-md space-y-4">
//           {product && (
//             <>
//               <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
//                 <span className="font-semibold">Condition:</span>
//                 <span>{product.condition}</span>
//               </div>

//               {/* Categories */}
//               <div className="mt-4">
//                 <div className="flex items-center mb-2">
//                   <FaTags className="text-gray-800 mr-2" />
//                   <span className="text-gray-800 font-semibold">
//                     Categories:
//                   </span>
//                 </div>
//                 {product.category && product.category.length > 0 ? (
//                   <div className="flex flex-wrap">
//                     {getCategoryNames(product.category)
//                       .split(", ") // Split the concatenated category names into an array
//                       .map((categoryName, index) => (
//                         <span
//                           key={index}
//                           className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
//                         >
//                           {categoryName}
//                         </span>
//                       ))}
//                   </div>
//                 ) : (
//                   <p className="text-gray-600">No categories available.</p>
//                 )}
//               </div>
//               <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
//                 <span className="font-semibold">Location:</span>
//                 <span>
//                   {product.location?.city}, {product.location?.street},{" "}
//                   {product.location?.zipCode}
//                 </span>
//               </div>
//               <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
//                 <span className="font-semibold">Seller:</span>
//                 <span>
//                   {product.seller?.username} ({product.seller?.email})
//                 </span>
//               </div>

//               {/* contact info */}
//               <div className="flex flex-col space-y-4 pb-4 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all duration-300">
//                 {/* Email Section */}
//                 <div className="flex items-center space-x-3 text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
//                   <span className="font-semibold">Email:</span>
//                   <a
//                     href={`mailto:${product.contactInfo?.email}`}
//                     className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
//                   >
//                     {product.contactInfo?.email}
//                   </a>
//                 </div>

//                 {/* Phone Section */}
//                 <div className="flex items-center space-x-3 text-sm text-gray-700">
//                   <span className="font-semibold">Phone:</span>
//                   <a
//                     href={`tel:${product.contactInfo?.phone}`}
//                     className="text-green-600 hover:text-green-800 transition-colors duration-300"
//                   >
//                     {product.contactInfo?.phone}
//                   </a>
//                 </div>
//               </div>

//               {/* status  */}
//               <div className="flex justify-between text-sm text-gray-700 pb-3 border-b border-dotted border-gray-300 hover:bg-gray-50 transition-all">
//                 <span className="font-semibold">Status:</span>
//                 <span>{product.status}</span>
//               </div>

//               <div className="flex justify-between text-sm text-gray-700 pb-3  border-gray-300 hover:bg-gray-50 transition-all">
//                 <span className="font-semibold">Posted At:</span>
//                 <span>{postedTime}</span>
//               </div>

//               {/* Product ID and Report Icon */}
//               <div className="p-4 border-t border-gray-200 flex items-center justify-between">
//                 {/* Optimized Product ID */}
//                 <div className="flex items-center">
//                   <p className="text-xs text-gray-500">
//                     Product ID:{" "}
//                     <span className="font-semibold">{productId.slice(-8)}</span>
//                   </p>
//                   <button
//                     className="ml-2 text-gray-500 hover:text-blue-600 focus:outline-none"
//                     onClick={handleCopy}
//                     title="Copy full ID"
//                   >
//                     <FaCopy className="text-sm" />
//                   </button>
//                 </div>

//                 {/* Copy Confirmation */}
//                 {copySuccess && (
//                   <span className="text-xs text-green-500 ml-2">Copied!</span>
//                 )}
//               </div>
//             </>
//           )}
//         </div>

//         <div className="mt-6">
//           <p className="text-3xl font-bold text-gray-800 text-right">
//             <span>₺</span>
//             {product?.price?.amount != null
//               ? product.price.amount.toFixed(2)
//               : "0.00"}
//           </p>
//         </div>
//       </div>

//       {/* Suggested Products */}
//       <div className="md:w-1/3 p-4 bg-gray-50 rounded-md">
//         <h3 className="text-xl font-semibold mb-4">Suggested Products</h3>
//         <div className="grid gap-4">
//           {suggestedProducts.length > 0 ? (
//             suggestedProducts.map((suggestedProduct, index) => (
//               <div key={index} className="flex items-center">
//                 <img
//                   src={
//                     suggestedProduct.imageUrl ||
//                     "https://via.placeholder.com/50"
//                   }
//                   alt={suggestedProduct.name || "Suggested product"}
//                   className="w-16 h-16 rounded-md object-cover mr-3"
//                 />
//                 <div>
//                   <h4 className="font-medium text-sm">
//                     {suggestedProduct.name || "No name available"}
//                   </h4>
//                   <p className="text-gray-600 text-sm">
//                     <span>₺</span>

//                     {suggestedProduct.price?.amount != null
//                       ? suggestedProduct.price.amount.toFixed(2)
//                       : "0.00"}
//                   </p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-600 text-sm">
//               No suggested products available.
//             </p>
//           )}
//         </div>
//       </div>

//       {/* ToastContainer for displaying the toast notifications */}
//       <ToastContainer />
//     </div>
//   );
// };

// Product.propTypes = {
//   suggestedProducts: PropTypes.arrayOf(
//     PropTypes.shape({
//       imageUrl: PropTypes.string,
//       name: PropTypes.string,
//       price: PropTypes.shape({
//         amount: PropTypes.number,
//       }),
//     })
//   ),
// };

// export default Product;
