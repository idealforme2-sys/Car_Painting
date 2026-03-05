/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts}'],
  safelist: ['bg-carbon/95'],
  theme: {
    extend: {
      colors: {
        carbon: '#09090b',
        graphite: '#18181b',
        racingRed: '#dc2626',
        racingRedGlow: '#ef4444',
        silver: '#e2e8f0',
        steel: '#a1a1aa',
      },
      fontFamily: {
        heading: ['Oswald', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
