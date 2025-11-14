/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* 🧠 Unified Font Families (Edge-like rendering) */
      fontFamily: {
        calvino: ['Calvino', 'Inter', 'sans-serif'],
        juanabold: ['JuanaBold', 'Inter', 'sans-serif'],
        juanathin: ['JuanaThin', 'Inter', 'sans-serif'],
        sfpro: ['SF Pro Display', 'Inter', 'sans-serif'],
      },

      /* 🔠 Normalize Chrome letter-spacing and text thickness */
      letterSpacing: {
        tightfix: '0.02em',
      },

      /* 📏 Fix Chrome viewport height rounding issue */
      height: {
        screen: '100dvh',
      },

      /* 🎨 Brand color palette (optional but improves consistency) */
      colors: {
        primary: '#2563eb',   // blue-600
        dark: '#111111',
        light: '#f9fafb',
      },

      /* 🧩 Box shadow tweak for sharper Chrome rendering */
      boxShadow: {
        smooth: '0 4px 12px rgba(0,0,0,0.08)',
        soft: '0 8px 20px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],

  /* ✅ Ensures Tailwind resets browser defaults fully */
  corePlugins: {
    preflight: true,
  },
};
