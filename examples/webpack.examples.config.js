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
    'example9.min': './examples/example9.js',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
};


/*
const webpack = require('webpack');
module.exports = {
  entry: {
    'example1.bundle': './examples/example1.js',
    'example1.min': './examples/example1.js',
    //'example2.min': './examples/example2.js',
  },
  output: {
    path: path.join(__dirname, 'examples'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true,
    }),
  ],
  resolve: {
    alias: {
      'global-view': p.join(__dirname, 'dist/global-view.js'),
    },
  },
  externals: [
    'child_process',
  ],
};
*/
