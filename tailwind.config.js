/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          400: '#f97316', // customize to your admin orange!
        },
        // You can add more colors here if needed
      },
    },
  },
  plugins: [],
}
