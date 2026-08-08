/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        galaxy: {
          purple: '#4f46e5',
          violet: '#8b5cf6',
          blue: '#38bdf8',
          cyan: '#22d3ee',
          pink: '#f472b6',
          yellow: '#fbbf24',
        },
      },
      boxShadow: {
        soft: '0 18px 45px rgba(79,70,229,0.16)',
      },
    },
  },
  plugins: [],
};
