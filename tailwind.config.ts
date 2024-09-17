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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
        roboto: ['var(--font-roboto)'],
      },
      screens: {
        "1200px": "1200px",
        "1000px": "1000px",
        "800px": "800px",
        "600px": "600px",
        "400px": "400px"
      }
    },
  },
  plugins: [],
  darkMode: "class"
};
export default config;
