/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A285F",
        secondary: "#FFCC00",
        tertiary: "#D5A100",
        quaternary: "#0075BE",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        prgh: ["Poppins", "sans-serif"],
        spans: ["Roboto", "sans-serif"],
        heading: ['"Press Start 2P"', "cursive"],
      },
    },
  },
  plugins: [],
};
