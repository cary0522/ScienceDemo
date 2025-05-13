/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        defaultColor: '#4E64A6',
        defaultBg: "#fffef7",
        defaultLight: '#99B3D1',
        defaultDark: "#04ADBF",
        TableBg: '#3e6ea833'
      },
    },
  },
  plugins: [],
}

