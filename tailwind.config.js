/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/pages/settings/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      transitionProperty: {
        'height': 'height',
        'width': 'width',
        'spacing': 'margin, padding',
      }
    },
    colors: {
      'gray': {
        100: '#f3f4f6',
        700: '#334155',
        800: '#1e293b',
      }
    }
  },
  plugins: [],
  darkMode: 'class',
}
