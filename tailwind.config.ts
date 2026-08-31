import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#202260",
        "background-light": "#132a45",
        "background-card": "#1a3a5c",
        accent: {
          DEFAULT: "#610713",
          light: "#7a0e1a",
          dark: "#4d0510",
        },
        text: {
          primary: "#ffffff",
          secondary: "#a0b4c8",
          muted: "#6b7f95",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
