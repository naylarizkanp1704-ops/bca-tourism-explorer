/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bca: {
          primary: "#005BAC",
          secondary: "#00AEEF",
          accent: "#22C55E",
          ink: "#1A202C",
          sub: "#64748B",
          border: "#E8EEF4",
          hover: "#EAF5FF",
          soft: "#F7FAFC",
          danger: "#EF4444",
          warning: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        pill: "9999px",
      },
      boxShadow: {
        floating: "0 8px 30px rgba(0,0,0,0.08)",
      },
      keyframes: {
        popIn: { from: { opacity: 0, transform: "scale(0.4)" }, to: { opacity: 1, transform: "scale(1)" } },
        fadeSlide: { from: { opacity: 0, transform: "translateY(-6px)" }, to: { opacity: 1, transform: "translateY(0)" } },
      },
      animation: {
        popIn: "popIn 0.35s ease",
        fadeSlide: "fadeSlide 0.2s ease",
      },
    },
  },
  plugins: [],
};
