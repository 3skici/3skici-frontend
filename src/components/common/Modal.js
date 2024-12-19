import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, title, children, onClose, type }) => {
  if (!isOpen) return null;

  const typeStyles = {
    info: "bg-blue-500 text-white",
    warning: "bg-yellow-500 text-black",
    error: "bg-red-500 text-white",
  };

  const typeIcons = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-1/3 p-6 shadow-lg">
        <div className={`flex justify-between items-center mb-4 ${typeStyles[type] || "bg-gray-500 text-white"} p-4 rounded-t`}>
          <h2 className="text-xl font-bold flex items-center">
            <span className="mr-2">{typeIcons[type]}</span>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            X
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["info", "warning", "error"]),
};

export default Modal;
