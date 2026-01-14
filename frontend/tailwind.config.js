/** @type {import('tailwindcss').Config} */
module.exports = {
  //   purge: {
  //     // enabled: true,
  //     // content: ['./src/**/*.vue'],
  //     "./index.html",
  //     "./src/**/*.{vue,js,ts,jsx,tsx}",
  //   },
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "media", //false, // or 'media' or 'class'
  theme: {
    groupLevel: 10,
    // will result in as many direct child selectors as defined here
    groupScope: "scope",
    // will result in group-scope being available in addition to the base group
    groupVariants: ["hover", "focus"],
    extend: {
      textShadow: {
        default: "0 2px 5px rgba(0, 0, 0, 0.5)",
        // Add more if needed
      },
      colors: {
        "semi-75": "rgba(0, 0, 0, 0.75)",
        yellow: "#FFC504",
        blue: "#05ACB2",
        pink: "#D33D81",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#F4F4F4",
        green: "#31B5B3",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        asap: ["Asap Condensed", "sans-serif"],
        wild: ["TheWildBunch", "sans-serif"],
        AsapCondensedBold: ["AsapCondensedBold", "sans-serif"],
        AsapCondensedRegular: ["AsapCondensedRegular", "sans-serif"],
        AsapCondensedLight: ["AsapCondensedLight", "sans-serif"],
        AsapCondensedSemiBold: ["AsapCondensedSemiBold", "sans-serif"],
        AsapCondensedItalic:["AsapCondensedItalic","sans-serif"],
      },
      transitionProperty: {
        "max-h": "max-height",
        "max-w": "max-width",
        w: "width",
        h: "height",
      },
      maxWidth: {
        "screen-xl": "1100px",
      },
      width: {
        30: "120px",
      },
      height: {
        30: "120px",
      },
      spacing: {
        30: "120px",
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  variants: {
    extend: {
      height: ["hover", "group-hover"],
      maxHeight: ["hover", "group-hover"],
    },
    display: ["responsive", "group-hover", "group-focus"],
    scale: ["hover", "group-hover"],
    scrollbar: ["rounded"],
    translate: ["group-hover"],
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow": {
          textShadow: "0 5px 5px rgba(227, 133, 37, 0.7)",
        },
        // Add more if needed
      };
      addUtilities(newUtilities);
    },
    // require("tailwind-scrollbar"),
  ],
};
