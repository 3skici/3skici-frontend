import React from "react";
import PropTypes from "prop-types";
import { categoryIcons } from "../../assets/icons/categoryIcons";
import { useTranslation } from "react-i18next";

const Categories = ({
  categories,
  selectedCategory,
  onCategorySelect,
  loading,
}) => {
  const { t } = useTranslation();
  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="mb-6 p-4">
      <div className="flex flex-wrap gap-6 md:gap-10 lg:gap-14">
        {categories.map((category) => {
          const { icon, bgColor, activeColor } = categoryIcons[category.name];
          const isActive = selectedCategory?._id === category._id;

          return (
            <div
              key={category._id}
              className="flex flex-col justify-center items-center"
            >
              <button
                onClick={() => onCategorySelect(category)}
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-20 flex items-center justify-center text-2xl rounded-full cursor-pointer transition-colors duration-200 ${
                  isActive ? activeColor : bgColor
                }`}
              >
                <div className="flex items-center justify-center ">
                  {/* Dynamically assign the icon and apply color based on active state */}
                  {React.cloneElement(icon, {
                    className: `text-4xl sm:text-2xl lg:text-5xl ${
                      isActive ? "text-white" : "text-gray-700"
                    }`,
                  })}
                </div>
              </button>
              <span className="leading-tight mt-4 mb-2 text-sm sm:text-base lg:text-lg">
                {t(`${category.name}`)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.object,
  onCategorySelect: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Categories;
