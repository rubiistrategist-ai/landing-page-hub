import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#37C96B",
          dark: "#1C2B39",
          gray: "#F5F7FA",
          text: "#667085B",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 43, 57, 0.05)',
        'card': '0 10px 40px -10px rgba(28, 43, 57, 0.08)',
      }
    },
  },
  plugins: [],
};
export default config;