module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  rules: {},
  globals: {
    __VERSION__: 'readonly'
  }
};
