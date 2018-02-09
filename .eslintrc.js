module.exports = {
  "extends": "airbnb-base",
  "env": {
    "mocha": true
  },
  "globals": {
    "Image": true,
    "window": true,
    "document": true,
    "ImageData": true,
    "XMLHttpRequest": true,
    "FileReader": true,
  },
  "rules": {
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }], // allow functions
  },
};