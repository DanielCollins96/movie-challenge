module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
       'body-bg': "url('/felix-mooneeram-evlkOfkQ5rE-unsplash.jpg')",
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
