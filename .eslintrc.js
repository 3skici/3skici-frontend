module.exports = {
    "env": {
      "browser": true,
      "es2021": true,
      "node": true
    },
    "extends": [
      "react-app",
      "eslint:recommended"
    ],
    "rules": {
      "no-unused-vars": ["warn"],  // Change to 'warn' instead of 'error'
      "react-hooks/exhaustive-deps": ["warn"]  // Change to 'warn' instead of 'error'
    }
  };
  