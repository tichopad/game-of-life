/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  devOptions: {
    open: 'firefox',
  },
  plugins: ['@snowpack/plugin-typescript'],
  packageOptions: {
    source: 'remote',
    types: true,
  },
};
