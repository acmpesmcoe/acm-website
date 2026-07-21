/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.2)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.8)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" }
        }
      },
      animation: {
        blob: "blob 10s infinite alternate"
      },
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
        display: ["Outfit", "sans-serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grad-signal": "linear-gradient(135deg, #4285F4 0%, #8B5CF6 50%, #EA4335 100%)",
        "grad-warm": "linear-gradient(135deg, #EA4335 0%, #FBBC05 100%)",
      },
    },
  },
  plugins: [],
};
