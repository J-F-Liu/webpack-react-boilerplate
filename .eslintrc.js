module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "max-len": "off",
    "no-else-return": "off",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "no-extend-native": "warn",
    "no-script-url": "warn",
    "global-require": "warn",
    "jsx-a11y/img-has-alt": "warn",
    "object-curly-spacing": ["error", "never"]
  },
  "plugins": [
    "react"
  ]
};
