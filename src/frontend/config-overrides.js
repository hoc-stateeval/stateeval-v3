const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@admin": "src/features/admin",
    "@evaluation": "src/features/evaluation",
    "@district-viewer": "src/features/district-viewer",
    "@calibration": "src/features/calibration",
    "@training": "src/features/training",
    "@components": "src/components",
    "@routes": "src/routes",
    "@lib": "src/lib",
    "@config": "src/config",
    "@images": "src/images",
    "@api-slice": "src/store/apiSlice",
    "@user-context-slice": "src/store/stateEval/userContextSlice",
  })(config);

  return config;
};

// const rewireAliases = require('react-app-rewire-alias');
// const { paths } = require('react-app-rewired');
// const path = require('path');

// /* config-overrides.js */
// module.exports = function override(config, env) {
// 	config = rewireAliases.aliasesOptions({
//     '@features': path.resolve(__dirname, `${paths.appSrc}/features`),
// 		'@components': path.resolve(__dirname, `${paths.appSrc}/components`),
//     '@routes': path.resolve(__dirname, `${paths.appSrc}/routes`),
//     '@user-context-slice': path.resolve(__dirname, `${paths.appSrc}/store`),
//     '@lib': path.resolve(__dirname, `${paths.appSrc}/lib`),
//     '@images': path.resolve(__dirname, `${paths.appSrc}/images`),
// 	})(config, env);
//   return config;
// }
