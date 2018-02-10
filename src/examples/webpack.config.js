const p = require('path');

module.exports = {
  entry: {
    'example1.min': './src/examples/example1.js',
    'example2.min': './src/examples/example2.js',
    'example3.min': './src/examples/example3.js',
    'example4.min': './src/examples/example4.js',
    'example5.min': './src/examples/example5.js',
    'example6.min': './src/examples/example6.js',
    'example7.min': './src/examples/example7.js',
    'example8.min': './src/examples/example8.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/examples',
  },
  output: {
    path: p.join(__dirname, './bin'),
    filename: '[name].js',
  },
};
