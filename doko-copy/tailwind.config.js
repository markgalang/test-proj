/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gomiBlue: '#2196F3',
        gomiYellow: '#DCB105',
        gomiGray: '#848484',
        gomiDarkGray: '#505050',
        gomiLightGray: '#cbcbcb',
        gomiShadow: '#ddd',
        gomiBorder: '#ddd',
        gomiYellowTransparent: 'rgba(220, 177, 5, 0.5)',
        gomiWarning: '#eeb711',
        gomiDanger: '#e74c3c',
        gomiSuccess: '#2ecc71',
        gomiNoInternet: '#969696',
      },
    },
  },
  plugins: [],
};
