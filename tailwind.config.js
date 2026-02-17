/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",

  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],

  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#10B981",
        accent: "#F59E0B"
      }
    }
  },

  plugins: []
};
