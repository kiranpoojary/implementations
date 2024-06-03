/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    //NOTE: : below-custom color on the go(Arbitrary values)
    //<button class="bg-[#1da1f2] text-white ...">
    // Don’t forget to include values like transparent and currentColor if you want to use them in your project.
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000",
      cyan: "cyan",
      aqua: "aqua",
      beige: "beige",
      blvlt: "blueviolet",
      "darktheme-primary": "#152447",
      red: {
        DEFAULT: "red",
      },
      primary: {
        DEFAULT: "#0a46fa",
        100: "#0f40ff",
      },
      tahiti: {
        DEFAULT: "#06b6d4",
        100: "#cffafe",
        200: "#a5f3fc",
        300: "#67e8f9",
      },
      pink: "#35a459",
      // white,bg-tahiti, bg-tahiti-300
    },
    spacing: {
      13: "3.25rem",
      15: "3.75rem",
      128: "32rem",
      144: "36rem",
      dark: "#0e7490",
      //p-13, m-15, h-15
    },
    margin: {
      "ml-4": "1rem",
    },
    extend: {},
  },
  plugins: [],
};
