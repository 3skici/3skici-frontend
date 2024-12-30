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
        "light-beige": "#F2F9FF", // for bg

        // Secondary Color
        "card-bg": "#FFF", //cards bg

        // Accent Color
        "light-nav": "#E4F1FF", // nav
        "light-footer": "#D0E4FF",
        "dark-blue": "#3B3B3B",
        "fav-bg": "#5CB338",
        "fav-hov": "#4E9C2D",
      },
    },
  },
  plugins: [rtl],
};
