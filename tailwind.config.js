/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        bg: "gray-900",
      },
    },
  },
  plugins: [rtl],
};
