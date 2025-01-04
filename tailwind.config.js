/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"], // For English
        cairo: ["Cairo", "sans-serif"], // For Arabic
        noto: ["Noto Sans", "sans-serif"], // For Turkish
      },
      colors: {
        "light-beige": "#F2F9FF",
        "card-bg": "#FFF",
        "light-nav": "#E4F1FF",
        "light-footer": "#D0E4FF",
        "dark-blue": "#3B3B3B",
        "fav-bg": "#5CB338",
        "fav-hov": "#4E9C2D",
      },
    },
  },
  plugins: [rtl],
};
