module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
        viewportWidth: 375,
        unitPrecision: 3,
        viewportUnit: "vw",
        selectorBlackList: ['.ignore', '.hairlines'],
        minPixelValue: 10,
        mediaQuery: false
      }
  }
}