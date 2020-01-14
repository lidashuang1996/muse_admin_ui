module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-spacing': 'off',
    'semi': [2, 'always'] // 强制语句分号结尾
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
