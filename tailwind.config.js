/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0B0B12",
        surface: "#14141F",
        surface2: "#1B1B29",
        accent: {
          primary: "#6E56CF",
          secondary: "#38BDF8",
          warm: "#F5A623",
          danger: "#E5484D",
        },
        ink: {
          primary: "#F5F5F7",
          muted: "#8B8B99",
          faint: "#54546A",
        },
        bordersubtle: "#24243A",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grad-signal": "linear-gradient(135deg, #6E56CF 0%, #38BDF8 100%)",
      },
    },
  },
  plugins: [],
};
