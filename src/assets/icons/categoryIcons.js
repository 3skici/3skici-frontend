import {
  FaTshirt,
  FaPhoneAlt,
  FaCouch,
  FaHome,
  FaBook,
  FaPuzzlePiece,
  FaFutbol,
  FaTint,
  FaGift,
} from "react-icons/fa";

export const categoryIcons = {
  Clothing: {
    icon: <FaTshirt />,
    bgColor: "bg-blue-100",
    activeColor: "bg-blue-500",
  },
  Electronics: {
    icon: <FaPhoneAlt />,
    bgColor: "bg-green-100",
    activeColor: "bg-green-500",
  },
  Furniture: {
    icon: <FaCouch />,
    bgColor: "bg-yellow-100",
    activeColor: "bg-yellow-500",
  },
  Home: {
    icon: <FaHome />,
    bgColor: "bg-purple-100",
    activeColor: "bg-purple-500",
  },
  Books: { icon: <FaBook />, bgColor: "bg-red-100", activeColor: "bg-red-500" },
  Toys: {
    icon: <FaPuzzlePiece />,
    bgColor: "bg-orange-100",
    activeColor: "bg-orange-500",
  },
  Sports: {
    icon: <FaFutbol />,
    bgColor: "bg-teal-100",
    activeColor: "bg-teal-500",
  },
  Beauty: {
    icon: <FaTint />,
    bgColor: "bg-pink-100",
    activeColor: "bg-pink-500",
  },
  Free: {
    icon: <FaGift />,
    bgColor: "bg-gray-100",
    activeColor: "bg-gray-500",
  },
};
