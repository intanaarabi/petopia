/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
       'background':{
        'primary':'#F4F7FE'
       },
       'typography': {
        'primary':'#2B3674',
        'secondary':'#A3AED0'
       },
       'accent': {
          'primary': '#8980FF',
          'secondary': '#FF9F6A',
          'tertiary': '#FFBAB6',
          'quaternary': '#FFD986'
       }
      }
    },
  },
  plugins: [],
}