// /* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')

// module.exports = {
//   root: true,
//   'extends': [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     '@vue/eslint-config-prettier/skip-formatting'
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest'
//   }
// }


module.exports = {
  extends: [



    // 'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue/recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    "allowEmptyLines": true,

    'vue/multiline-html-element-content-newline': ['error', {
      'ignoreWhenEmpty': true,
      'ignores': ['pre', 'textarea', ...INLINE_ELEMENTS],
      'allowEmptyLines': false
    }],

    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}