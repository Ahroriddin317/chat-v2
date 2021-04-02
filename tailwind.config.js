module.exports = {
  purge: ['./client/**/*.html', './client/**/*.jsx', './client/**/*.js'],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'body-bg': "url('../images/bg.jpg')"
      }),
      spacing: {
        '35': '8.8rem'
      }
    },
    fontFamily: {
      lato: ['Lato']
    }
  },
  variants: {},
  plugins: []
}
