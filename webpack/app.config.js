const path = require('path')
const merge = require('webpack-merge')

const env = require('./utils/env')

module.exports = merge({
  paths: {
    root: path.resolve(__dirname, '../'),
    public: path.resolve(__dirname, '../public'),
    sass: path.resolve(__dirname, '../assets/style'),
    fonts: path.resolve(__dirname, '../assets/fonts'),
    images: path.resolve(__dirname, '../assets/images'),
    javascript: path.resolve(__dirname, '../assets/js'),
    relative: '../',
    external: /node_modules|bower_components/
  },

  assets: [],

  outputs: {
    css: {
      filename: env('FILENAME_CSS', 'css/[name]_[hash].css')
    },

    font: {
      filename: env('FILENAME_FONT', 'fonts/[name].[ext]')
    },

    image: {
      filename: env('FILENAME_IMAGE', 'images/[path][name].[ext]')
    },

    javascript: {
      filename: env('FILENAME_JAVASCRIPT', 'js/[name]_[hash].js')
    },

    external: {
      image: {
        filename: env('FILENAME_EXTERNAL_IMAGE', 'images/[name].[ext]')
      },
      font: {
        filename: env('FILENAME_EXTERNAL_FONT', 'fonts/[name].[ext]')
      }
    }
  },

  resolve: {
    alias: {
      'js': 'assets/js/',
    }
  },

  settings: {
    sourceMaps: env('SOURCEMAPS', 'source-map'),
    styleLint: {
      context: 'resources/assets'
    },
    browserSync: {
      proxy: env('BROWSERSYNC_PROXY', 'http://localhost/'),
      open: env('BROWSERSYNC_OPEN', false),
      reloadDelay: env('BROWSERSYNC_DELAY', 500),
      files: [
        'part/**/*.php',
        'inc/**/*.php',
        'woocommerce/**/*.php',
        '*.php',
        'assets/js/**/*.js',
        'assets/style/**/*.{sass,scss}',
        'assets/images/**/*.{jpg,jpeg,png,gif,svg}',
        'assets/fonts/**/*.{eot,ttf,woff,woff2,svg}'
      ]
    }
  }
}, {
  "assets": {
    "app": [
      "./assets/js/index.js",
      "./assets/style/index.scss"
    ]
  }
})