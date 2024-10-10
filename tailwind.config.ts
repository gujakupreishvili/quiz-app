import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Enable dark mode based on a class
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Use custom CSS variables for background
        foreground: "var(--foreground)", // Use custom CSS variables for foreground
      },
    },
  },
  plugins: [],
};

export default config;
