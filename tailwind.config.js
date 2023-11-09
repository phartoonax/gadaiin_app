/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      body: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      sans: [
        "Inter",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "system-ui",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },

    extend: {
      boxShadow: {
        "outline-up":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
      colors: {
        themeColor: "#1EBF65",
        primary: {
          Hover: "#00A9D1",
          Main: "#03B8E8",
          Border: "#E3F9FF",
          Surface: "#F5FDFF",
        },
        neutral: {
          100: "#1F2933",
          90: "#323F4B",
          80: "#475A6B",
          70: "#7B8794",
          60: "#9AA5B1",
          50: "#CBD2D9",
          40: "#E4E7EB",
          30: "#F2F3F5",
          20: "#F8F9FA",
          10: "#FFFFFF",
        },
      },
      display: ["before", "after"],
      content: ["before", "after"],
      // Add other properties as needed
    },
  },
  plugins: [],
};
