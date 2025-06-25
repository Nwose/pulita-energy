/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
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
