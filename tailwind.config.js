export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  safelist: [
    "animate-fadeIn",
    "animate-fadeOut",
    "animate-bounce",
    "sm:animate-fadeInLarge",
    "sm:animate-fadeOutLarge",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EB2738",
        primaryDark: "#640911",
        secondary: "#F8F8FF",
        bot: "#FFEEDD",
        user: "#D7D7F8",
        text: "#333333",
        accent: "#FF5733",
      },
      animation: {
        bounce: "bounce 1s infinite",
        fadeIn: "fadeIn 0.3s ease-in-out forwards",
        fadeOut: "fadeOut 0.3s ease-in-out forwards",
        fadeInLarge: "fadeInLarge 0.5s ease-in-out forwards",
        fadeOutLarge: "fadeOutLarge 0.5s ease-in-out forwards",
        floatUpDown: "floatUpDown 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        fadeInLarge: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOutLarge: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(20px)" },
        },
        floatUpDown: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
          "70%": { transform: "translateY(-10px)" },
          "80%": { transform: "translateY(0px)" },
        },
      },
    },
  },
  plugins: [],
};
