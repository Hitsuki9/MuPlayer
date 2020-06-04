module.exports = {
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  rules: {},
  globals: {
    __VERSION__: 'readonly'
  }
};
