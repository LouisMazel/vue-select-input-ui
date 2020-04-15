module.exports = {
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  publicPath: './',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/scss/vars.scss";`
      }
    }
  }
}
