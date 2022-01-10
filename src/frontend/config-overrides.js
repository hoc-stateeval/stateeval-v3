const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@ui': 'src/ui/',
    '@store': 'src/store',
    '@lib': 'src/lib',
    '@images': 'src/images',

  })(config);

  return config;
};