/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "var(--c-void)",
        surface: "var(--c-surface)",
        surface2: "var(--c-surface2)",
        accent: {
          primary: "var(--c-accent-primary)",
          secondary: "var(--c-accent-secondary)",
          warm: "var(--c-accent-warm)",
        },
        ink: {
          primary: "var(--c-ink-primary)",
          muted: "var(--c-ink-muted)",
          faint: "var(--c-ink-faint)",
        },
        bordersubtle: "var(--c-border-subtle)",
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grad-signal": "linear-gradient(135deg, #6E56CF 0%, #38BDF8 100%)",
        "grad-warm": "linear-gradient(135deg, #F5A623 0%, #6E56CF 100%)",
      },
    },
  },
  plugins: [],
};
