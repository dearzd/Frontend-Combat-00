const path = require('path');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    library: 'ostrichMonitor',
    libraryTarget: 'window',
    filename: 'ostrich.js'
  }
}
