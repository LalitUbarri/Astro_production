const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // other webpack config options
  plugins: [
    // other plugins
    new BundleAnalyzerPlugin(),
  ],
};

module.exports = {
    entry: './app.js',
    output: {
      filename: 'bundle.js',
      path: __dirname + '/dist',
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 10000,
        maxSize: 250000,
      },
    },
  };
  