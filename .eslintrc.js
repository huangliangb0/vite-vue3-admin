/*
 * @Description: eslint配置
 * @Date: 2022-07-22 11:41:55
 * @LastEditTime: 2022-07-22 11:50:13
 * @FilePath: \vite-vue3-admin\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:@babel/eslint-parser',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-useless-template-attributes': 'off',
    'vue/no-reserved-component-names': 'off',
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // plugins: ['@typescript-eslint'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
