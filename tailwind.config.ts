import type { Config } from "tailwindcss";
import daisyui from "daisyui";

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
    },
  },
  daisyui: {
    themes: [
      {
        gxtheme: {
          primary: "#2563eb",
          "primary-content": "#f3f4f6",
          secondary: "#f5f5f4",
          "secondary-content": "#160016",
          accent: "#a855f7",
          "accent-content": "#f5f5f4",
          neutral: "#f3f4f6",
          "neutral-content": "#160016",
          "base-100": "#ffffff",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          info: "#bae6fd",
          "info-content": "#292524",
          success: "#86efac",
          "success-content": "#001616",
          warning: "#fef08a",
          "warning-content": "#001600",
          error: "#fca5a5",
          "error-content": "#160000",
        },
      },
    ],
  },
  plugins: [daisyui],
};
export default config;
