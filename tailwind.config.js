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
        // Core Colors
        "light-coffee": "#F3f4f6 ", //secondary color - for nav
        "dark-purple-blue": "#060318", // nav links

        // Background Colors
        "off-white": "#FAFAFA", // for all elements and pages bg
        "light-frost": "#F8FAFC", //cards bg
      },
    },
  },
  plugins: [rtl],
};
