const path = require('path');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

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
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        screw_ie8: true,
        mangle: { // needed for Parallel to work
          reserved: ['computeDensityMap', 'computeClusterMap', 'ForwardList'],
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};
