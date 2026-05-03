/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "primary": "#F4DFD0",
            "secondary": "#EFC9C2",
            "accent": "#e5d5c4",
        },
    },
  },
  plugins: [],
};