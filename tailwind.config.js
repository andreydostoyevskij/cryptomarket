/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./templates/**/*.{html,js}", // Includes all files inside the templates folder
    "./scripts/**/*.{js,ts}"     // Includes JavaScript files in the scripts folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

