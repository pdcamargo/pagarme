module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es6: true,
    node: true
  },
  plugins: ["@typescript-eslint", "import-helpers"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "standard"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always", // new line between groups
        groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
        alphabetize: { order: "asc", ignoreCase: true }
      }
    ]
  }
};
