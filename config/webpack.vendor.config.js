const webpack = require('webpack');

const vendors = [
  'jquery',
  'echarts'
];

module.exports = {
  output: {
    path: '/dist',
    filename: '[name].[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]_[chunkhash]',
      context: __dirname,
    }),
  ],
};