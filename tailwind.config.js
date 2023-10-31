/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        content: "minmax(250px, 250px) minmax(320px, 1fr) minmax(250px,250px)",
      },
    },
  },
  plugins: [],
};
