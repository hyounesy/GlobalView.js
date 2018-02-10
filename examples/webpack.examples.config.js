const p = require('path');

module.exports = {
  entry: {
    'example1.min': './examples/example1.js',
    'example2.min': './examples/example2.js',
    'example3.min': './examples/example3.js',
    'example4.min': './examples/example4.js',
    'example5.min': './examples/example5.js',
    'example6.min': './examples/example6.js',
    'example7.min': './examples/example7.js',
    'example8.min': './examples/example8.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './examples',
  },
  output: {
    path: p.join(__dirname, './bin'),
    filename: '[name].js',
  },
};
