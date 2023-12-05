/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontSize: {
      xxs: ["10px", "12px"],
      xs: ["12px", "20px"],
      sm: ["14px", "18px"],
      base: ["16px", "24px"],
      lg: ["18px", "28px"],
      xl: ["20px", "30px"],
    },
    fontFamily: {
      inter: ["Inter", "Sans-serif"],
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

    screens: {
      ssm: "320px",
      smm: "375px",
    },

    extend: {
      boxShadow: {
        "outline-up":
          "0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)",
        customForFilter: "0 -2px 4px 0 rgba(0, 0, 0, 0.25)",
      },
      transitionProperty: {
        transform: "transform",
      },
      translate: {
        full: "100%",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s forwards",
        slideDown: "slideDown 0.3s forwards",
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
        lelang: {
          Main: "#B267FF",
          Surface: "#FAF5FF",
        },
        danger: {
          Hover: "#B91919",
          Main: "#D21C1C",
          Border: "#F4D2D2",
          Surface: "#FCF3F2",
          Pressed: "#9D1515",
        },
        success: {
          Main: "#28A138",
          Hover: "#238B31",
          Pressed: "#1D7228",
          Border: "#C3DFC7",
          Surface: "#F0F7F5",
        },
        info: {
          Main: "#0172CB",
          Hover: "#0161AC",
          Pressed: "#01508E",
          Border: "#D0E9FB",
          Surface: "#F2F8FC",
        },
        warning: {
          Main: "#E98305",
          Hover: "#DC7C05",
          Pressed: "#CD7304",
          Border: "#FAE2C7",
          Surface: "#FCF9F2",
        },
      },
      display: ["before", "after"],
      content: ["before", "after"],
      // Add other properties as needed
    },
  },
  plugins: [],
});
