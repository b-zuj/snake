const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Gallery',
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
    })
  ]
};