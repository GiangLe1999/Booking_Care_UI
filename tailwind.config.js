/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        admin_main_color: "#0071ba",
        sub_color: "#f7d800",
        main_color: "#45c3d2",
        section_bg: "#f5f5f5",
        title_text: "#333333",
        normal_text: "#444444",
        yellow: "#fff04b",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "120ch",
          },
        },
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
