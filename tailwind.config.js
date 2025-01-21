/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: "576px",  // Mobile
      md: "768px",  // Tablet
      lg: "992px",  // Small Laptop
      xl: "1200px", // Desktop
      xxl: "1400px", // Large Desktop
    },
    extend: {
      keyframes: {
        shake: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(3deg)" },
          "50%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(1deg)" },
        },
      },
      animation: {
        shake: "shake 0.5s ease",
      },
      colors: {
        colorCodGray: "#191919",
        colorOrangyRed: "#FE330A",
        colorLinenRuffle: "#EFEAE3",
        colorViolet: "#321CA4",
        colorGreen: "#39FF14",
      },
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"],
        clashDisplay: ["Clash Display", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        spaceGrotesk: ["Space Grotesk", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require('daisyui'),],
}

