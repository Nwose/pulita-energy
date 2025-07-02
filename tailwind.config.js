/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      animation: {
        electricity: "electricity 1.5s linear infinite",
      },
      keyframes: {
        electricity: {
          "0%": { transform: "translateX(-100%)", opacity: 0 },
          "50%": { transform: "translateX(0%)", opacity: 0.5 },
          "100%": { transform: "translateX(100%)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
