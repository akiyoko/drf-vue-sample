module.exports = {
  outputDir: '../static',
  indexPath: '../templates/index.html',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/static/'
    : '/'
}
