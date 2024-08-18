/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        low: "#34D399",
        medium: "#FBBF24",
        high: "#EF4444",
        critical: "#000000",
      },
    },
  },
  plugins: [],
};
