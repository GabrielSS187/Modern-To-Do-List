/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-black": "#000000",
        "secondary-black": "#06152B",
        "primary-white": "#FFFFFF",
        "primary-green": "#4AC959",
        "secondary-green": "#46BD62",
        "primary-orange": "#E88D39",
        "primary-bg": "#F2F2F2",
      },
      fontFamily: {
        poppins: ["'Poppins'", ...defaultTheme.fontFamily.mono],
        montserrat: ["'Montserrat'", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}