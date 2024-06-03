/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:{
        primary: "#007BFF",
        background: "#F8F9FA",
        textPrimary: "#212529"
      },
      fontFamily: {
        sans: ['Inter','system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

