const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dev'),
    open: 'chrome',
    compress: false,
    hot: true,
    port: 8080,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
