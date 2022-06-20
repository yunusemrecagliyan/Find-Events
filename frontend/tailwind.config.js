/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: "#FECDD3",
          50: "#FFFFFF",
          100: "#FFF5F6",
          200: "#FECDD3",
          300: "#FD96A3",
          400: "#FC5F72",
          500: "#FB2842",
          600: "#E60520",
          700: "#AF0318",
          800: "#780211",
          900: "#410109",
        },
        primary: {
          DEFAULT: "#374D5A",
          50: "#A8BDCA",
          100: "#9BB3C2",
          200: "#82A0B2",
          300: "#688DA3",
          400: "#56788D",
          500: "#466373",
          600: "#374D5A",
          700: "#222F37",
          800: "#0C1114",
          900: "#000000",
        },
        tertiary: {
          DEFAULT: "#BFCBC2",
          50: "#E1E6E2",
          100: "#D6DDD7",
          200: "#BFCBC2",
          300: "#A0B2A4",
          400: "#819987",
          500: "#657D6B",
          600: "#4C5E50",
          700: "#333F36",
          800: "#1A201B",
          900: "#010101",
        },
      },
    },
  },
  plugins: [],
};
