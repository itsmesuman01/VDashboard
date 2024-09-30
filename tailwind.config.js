/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      screens: {
        'sm-screen': '710px'
      },
    },
  },
  plugins: [],
};
