module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "rules": {
    "max-len": "off",
    "comma-dangle": "off",
    "no-else-return": "off",
    "prefer-const": "warn",
    "prefer-template": "warn",
    "no-extend-native": "warn",
    "no-script-url": "warn",
    "no-use-before-define": "warn",
    "object-curly-spacing": ["error", "never"],
    "global-require": "warn",
    "jsx-a11y/img-has-alt": "warn",
    "react/prefer-stateless-function": "warn"
  },
  "plugins": [
    "react"
  ]
};
