module.exports = {
  presets: [
    '@babel/preset-env',
  ],
  plugins: [
    ['module-resolver', {
      root: ['./assets/js'],
      alias: {
        js: './assets/js',
      }
    }]
  ]
};