/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './src/**/*.{html,js}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
],
  theme: {
    extend: {
      fontFamily: {
        'culpa': ['"Mea Culpa"', 'cursive']
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

