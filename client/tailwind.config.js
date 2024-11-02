/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Include all JavaScript/TypeScript files
    "./index.html",          // Include main HTML file
    "./src/**/*.html"               // Include any HTML files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

