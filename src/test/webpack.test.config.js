const p = require('path');

module.exports = {
  entry: {
    'main.min': './src/test/main.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/test',
  },
  output: {
    path: p.join(__dirname, 'bin'),
    filename: '[name].js',
  },
};
