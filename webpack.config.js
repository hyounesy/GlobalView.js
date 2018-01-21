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
      'node_modules': path.join(__dirname, 'node_modules'),
    },
  },
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
  externals: [
    // to resolve webpack error:
    // ERROR in ./node_modules/paralleljs/lib/Worker.js Module not found:
    // Error: Can't resolve 'child_process' in './node_modules/paralleljs/lib'
    'child_process',
  ],
};
