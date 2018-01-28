const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'global-view.js',
    library: 'globalView',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      node_modules: path.join(__dirname, 'node_modules'),
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
    ],
  },
  node: {
    child_process: 'empty',
  },
};
