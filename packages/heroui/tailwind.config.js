import heroui from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./node_modules/@heroui/theme/dist/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  plugins: [heroui()],
  theme: {
    extend: {},
  },
};
