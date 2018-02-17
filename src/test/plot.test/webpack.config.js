const p = require('path');

module.exports = {
  entry: {
    'main.min': './src/test/plot.test/main.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/test/plot.test',
  },
  output: {
    path: p.join(__dirname, 'bin'),
    filename: '[name].js',
  },
};
