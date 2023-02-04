/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      screens: {
        "m-desktop": "1440px"
      },
      clipPath: {
        myPolygon: "polygon(0 39%, 100% 0, 100% 65%, 0 100%)",
        myPolygonFooter: "polygon(0 14%, 100% 0%, 100% 100%, 0% 100%)"
      },
      colors: {
        "primary-black": "#000000",
        "secondary-black": "#06152B",
        "primary-white": "#FFFFFF",
        "primary-green": "#4AC959",
        "secondary-green": "#46BD62",
        "primary-orange": "#E88D39",
        "primary-bg": "#F2F2F2",
        "primary-gray": "#9499B3"
      },
      fontFamily: {
        poppins: ["'Poppins'", ...defaultTheme.fontFamily.mono],
        montserrat: ["'Montserrat'", ...defaultTheme.fontFamily.mono],
      },
      zIndex: {
        "100": "100",
        "90": "90"
      }
    },
  },
  plugins: [
    require("tailwind-clip-path"), 
    require('autoprefixer'),
    require('tailwindcss'),
    require('tailwind-scrollbar'),
  ],
}