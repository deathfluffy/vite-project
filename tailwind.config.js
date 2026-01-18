/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fixel: ["Fixel Display", "sans-serif"],
      },
      screens: {
        xs: "320px", 
        sm: "375px", 
        md: "768px", // Tablet
        xl: "1440px", // Desktop
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
