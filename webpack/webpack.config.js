const isdev = require('isdev');
const webpack = require('webpack');

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');

const sassRule = require('./rules/sass');
const fontsRule = require('./rules/fonts');
const imagesRule = require('./rules/images');
const javascriptRule = require('./rules/javascript');
const externalFontsRule = require('./rules/external.fonts');
const externalImagesRule = require('./rules/external.images');

const config = require('./app.config');

module.exports = {
  mode: isdev ? 'development' : 'production',
  devtool: (isdev && config.settings.sourceMaps) ? config.settings.sourceMaps : false,
  devServer: {
    hot: true,
  },

  entry: config.assets,
  output: {
    path: config.paths.public,
    filename: config.outputs.javascript.filename,
  },
  resolve: config.resolve,

  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [],
  },

  module: {
    rules: [
      sassRule,
      fontsRule,
      imagesRule,
      javascriptRule,
      externalFontsRule,
      externalImagesRule,
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new webpack.LoaderOptionsPlugin({ minimize: !isdev }),
    new MiniCssExtractPlugin(config.outputs.css),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin([{
      context: config.paths.images,
      from: {
        glob: `${config.paths.images}/**/*`,
        flatten: true,
        dot: false,
      },
      to: config.outputs.image.filename,
    }]),
    new WebpackAssetsManifest({
      publicPath: true,
    }),
  ],
}

if (config.settings.browserSync) {
  module.exports.plugins.push(
    new BrowserSyncPlugin(config.settings.browserSync, {
      reload: true,
    })
  );
}

/**
 * Adds optimalizing plugins when
 * generating production build.
 */
if (!isdev) {
  module.exports.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    })
  );

  module.exports.optimization.minimizer.push(
    new UglifyJsPlugin({
      uglifyOptions: {
        parallel: true,
        extractComments: isdev,
        sourceMap: isdev,
      },
    })
  );
}