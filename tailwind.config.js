/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_color: "#0071ba",
        sub_color: "#bb8d09",
        menu_bg_color: "#f5f5f5",
        title_text: "#333333",
        normal_text: "#444444",
      },
    },
  },
  plugins: [],
};
