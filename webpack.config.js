const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'template-package.js',
    library: 'TemplatePackageName',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
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
};
