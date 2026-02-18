/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  darkMode: "class",

  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",        
    "./src/components/**/*.{js,ts,jsx,tsx}", 
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