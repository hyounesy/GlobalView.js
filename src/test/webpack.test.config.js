module.exports = {
  entry: {
    'main.min': './src/test/main.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src/test',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
  },
};
