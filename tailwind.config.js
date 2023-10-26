/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        admin_main_color: "#0071ba",
        admin_sub_color: "#bb8d09",
        admin_menu_bg: "#f5f5f5",
        title_text: "#333333",
        normal_text: "#444444",
      },
    },
  },
  plugins: [],
};
