/** @type {import('tailwindcss').Config} */
const rtl = require("tailwindcss-rtl");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add TS/TSX if using TypeScript
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"], // For English
        cairo: ["Cairo", "sans-serif"], // For Arabic
        noto: ["Noto Sans", "sans-serif"], // For Turkish
      },
      colors: {
        "light-beige": "#F2F9FF", // main bg
        "card-bg": "#FFF",
        "light-nav": "#E4F1FF",
        "light-footer": "#D0E4FF",
        "fav-bg": "#5CB338",
        "fav-hov": "#4E9C2D",
        "fiery-red": "#E62E2D",
      },
      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"], // This is already the default, but fine to extend
    },
  },
  plugins: [rtl], // Make sure this plugin is installed with npm or yarn
};
