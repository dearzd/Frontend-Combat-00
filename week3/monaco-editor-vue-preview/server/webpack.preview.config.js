const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: path.resolve(__dirname, 'cache/sourceCode/main.js'),
  output: {
    // path: path.resolve(__dirname, 'cache/dist'),
    path: path.resolve(__dirname, '../client/preview'),
    library: {
      name: 'preview',
      type: 'var'
    },
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './cache/sourceCode/index.html'),
      favicon: path.resolve(__dirname, 'cache/sourceCode/favicon.ico')
    })
  ]
};
