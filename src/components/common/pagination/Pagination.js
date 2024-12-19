// Pagination.jsx
import React, { useMemo } from "react";
import PropTypes from "prop-types";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  // Helper function to create a range of numbers
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };

  // Validating props
  if (typeof currentPage !== "number" || currentPage < 1) {
    console.error("Invalid currentPage prop, defaulting to 1.");
    currentPage = 1; // Default to 1 if invalid
  }

  if (typeof totalPages !== "number" || totalPages < 1) {
    console.error("Invalid totalPages prop, defaulting to 1.");
    totalPages = 1; // Default to 1 if invalid
  }

  // Helper function to calculate pagination range
  const paginationRange = () => {
    const totalPageNumbers = siblingCount * 2 + boundaryCount * 2 + 5;

    if (totalPages <= totalPageNumbers) {
      return range(1, totalPages);
    }

    const leftSiblingIndex = Math.max(
      currentPage - siblingCount,
      boundaryCount + 2
    );
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPages - boundaryCount - 1
    );

    const showLeftEllipsis = leftSiblingIndex > boundaryCount + 2;
    const showRightEllipsis =
      rightSiblingIndex < totalPages - boundaryCount - 1;

    const firstPageRange = range(1, boundaryCount);
    const lastPageRange = range(totalPages - boundaryCount + 1, totalPages);

    let middleRange = [];

    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemCount = siblingCount * 2 + boundaryCount + 1;
      middleRange = range(1, leftItemCount);
      return [...middleRange, "...", ...lastPageRange];
    }

    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemCount = siblingCount * 2 + boundaryCount + 1;
      middleRange = range(totalPages - rightItemCount + 1, totalPages);
      return [...firstPageRange, "...", ...middleRange];
    }

    if (showLeftEllipsis && showRightEllipsis) {
      middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [
        ...firstPageRange,
        "...",
        ...middleRange,
        "...",
        ...lastPageRange,
      ];
    }

    return []; // Return empty array if no valid range
  };

  const pages = useMemo(paginationRange, [
    currentPage,
    totalPages,
    siblingCount,
    boundaryCount,
  ]);

  // Early return if no pages are available or currentPage is invalid
  if (pages.length < 2 || currentPage < 1 || currentPage > totalPages) {
    return null;
  }

  const onNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      {/* Previous Button */}
      <button
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="items-center hidden md:flex gap-x-3">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-sm text-gray-500"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={`px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                page === currentPage
                  ? "text-blue-500 bg-blue-100/60 dark:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`flex items-center px-5 py-2 text-sm capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 ${
          currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        <span>Next</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 rtl:-scale-x-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  siblingCount: PropTypes.number,
  boundaryCount: PropTypes.number,
};

export default Pagination;
