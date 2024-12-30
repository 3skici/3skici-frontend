// src/utils/imageHelpers.js

/**
 * Constructs a full URL for an image.
 *
 * @param {string} imagePath - The path to the image.
 * @returns {string} - The full URL to the image.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "https://via.placeholder.com/150"; // Fallback image

  // Replace backslashes with forward slashes (if any)
  const normalizedPath = imagePath.replace(/\\/g, "/");

  // If the path is already an absolute URL, return it directly
  if (
    normalizedPath.startsWith("http://") ||
    normalizedPath.startsWith("https://")
  ) {
    return normalizedPath;
  }

  // Ensure the path starts with a single slash
  const pathWithSlash = normalizedPath.startsWith("/")
    ? normalizedPath
    : `/${normalizedPath}`;

  // Use the backend's base URL from environment variables
  const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  // Avoid double slashes
  return `${baseUrl}${pathWithSlash}`;
};
