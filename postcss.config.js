module.exports = ({ options }) => ({
  plugins: {
    'postcss-preset-env': { autoprefixer: { } },
    'cssnano': options.dev ? false : {
      preset: ['default', {
        discardComments: { removeAll: true },
      }],
    },
  },
});