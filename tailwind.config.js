/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        content: "minmax(300px, 300px) minmax(320px, 1fr) minmax(300px,300px)",
      },
    },
  },
  plugins: [],
};
