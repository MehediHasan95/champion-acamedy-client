/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "cursive"],
      },
      colors: {
        royalPurple: "#6951AE",
        deepRoyalPurple: "#703EDB",
        pastelBlue: "#AAD4C8",
        platinum: "#FF5B64",
        oceanBlue: "#190845",
      },
      backgroundColor: {
        royalPurple: "#6951AE",
        deepRoyalPurple: "#703EDB",
        pastelBlue: "#AAD4C8",
        platinum: "#FF5B64",
        oceanBlue: "#190845",
      },
    },
  },
  plugins: [require("daisyui")],
};
