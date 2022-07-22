/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        cblack: {
          100: '#333333',
          200: '#1a1a1a',
          300: "#000000",
        },
        cgreen: "#1ED760",
        cgray: "#EEEEEE",
        cgray2: "#3c3e44",
        clightgreen: "#19E68C"
      }
    },
    
  },
  plugins: [],
}
