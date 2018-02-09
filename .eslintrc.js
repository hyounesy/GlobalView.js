module.exports = {
  "extends": "airbnb-base",
  "env": {
    "mocha": true,
    "browser": true,
    "node": true
  },
  "globals": {
    "Image": true,
    "window": true,
    "document": true,
    "ImageData": true,
    "XMLHttpRequest": true,
    "FileReader": true,
    "$": true,
    "Float32Array": true,
    "Float16Array": true,
    "Uint8Array": true,
    "Uint32Array": true,
  },
  "rules": {
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }], // allow functions 
    'func-names': 0, // instead of warn
  },
};