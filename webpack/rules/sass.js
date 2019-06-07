const isdev = require('isdev')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = require('../app.config')

/**
 * Internal application SASS files.
 * Have build-in autoprefixing.
 */
module.exports = {
  test: /\.s[ac]ss$/,
  include: config.paths.sass,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: process.env.NODE_ENV === 'development',
      },
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: isdev
      }
    },

    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
      }
    },

    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ],
}