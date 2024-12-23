/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        // Primary Color
        "light-beige": "#F5F1EA", // for bg

        // Secondary Color
        "card-bg": "#FFFFFF", //cards bg

        // Accent Color
        "light-coffee": "#F7F7F7", // nav
        "dark-blue": "#3B3B3B", // nav links
      },
    },
  },
  plugins: [rtl],
};
