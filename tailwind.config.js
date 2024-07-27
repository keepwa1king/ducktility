/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/*.{js,jsx,ts,tsx}",
    "./src/layouts/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/routes/*.{js,jsx,ts,tsx}",
    "./src/containers/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard Variable", "sans-serif"]
      },
      fontSize: {
        title: ["24px", "36px"],
        body5: ["20px", "30px"],
        body4: ["16px", "22.4px"],
        body3: ["15px", "22.5px"],
        body2: ["14px", "18.2px"],
        body1: ["14px", "21px"],
        caption2: ["12px", "16.8px"],
        caption1: ["11px", "15.4px"]
      },
      letterSpacing: {
        title: "-0.3px",
        body5: "-0.5px",
        body4: "-0.1px",
        body3: "-0.5px",
        body2: "-0.1px",
        body1: "-0.3px",
        caption2: "-0.5px",
        caption1: "-0.5px"
      },
      colors: {
        ourBlue: "#3377FF",
        black: "#1B1D1F",
        white: "#FFFFFF",
        grey: {
          50: "#F7F8F9",
          100: "#E8EBED",
          200: "#C9CDD2",
          400: "#9EA4AA",
          500: "#6C7885",
          600: "#454C53",
          700: "#303539",
          800: "#24282D"
        }
      },
      maxWidth: {
        app: "393px"
      },
      gridTemplateColumns: {
        app: "20fr 16fr 16fr 16fr 20fr"
      },
      spacing: {
        "app-gutter": "16px"
      },
      borderRadius: {
        btn: "8px"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};
