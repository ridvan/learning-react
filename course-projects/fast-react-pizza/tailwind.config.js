/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      height: {
        screen: "100dvh",
      },
    },
    fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    // colors: {
    //   river: "#2F4F4F",
    // },
  },
  plugins: [],
};
