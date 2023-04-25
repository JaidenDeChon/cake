/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    // For Pug / ESLint support
    "plugin:vue/vue3-recommended",
    "plugin:vue-pug/vue3-recommended"
  ],
  "env": {
    "vue/setup-compiler-macros": true
  }
}
