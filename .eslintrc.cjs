/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier"
  ],
  globals: {
    amplitude: "readonly"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.spec.{js,ts,jsx,tsx}",
        "cypress/integration/**.spec.{js,ts,jsx,tsx}"
      ],
      extends: ["plugin:cypress/recommended"]
    }
  ],
  rules: {
    "vue/no-v-html": "off",
    "@typescript-eslint/no-namespace": "off"
  }
};
