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
    "@evidence-collection-slice": "src/store/stateEval/evidenceCollectionSlice",
  })(config);

  return config;
};
