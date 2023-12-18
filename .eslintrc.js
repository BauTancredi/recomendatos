module.exports = {
  root: true,
  extends: [
    "universe/native",
    "plugin:@typescript-eslint/recommended", // Use recommended rules from @typescript-eslint/eslint-plugin
  ],
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  rules: {
    "import/order": [
      1,
      {
        groups: ["external", "builtin", "internal", "sibling", "parent", "index"],
        pathGroups: [
          {
            pattern: "components",
            group: "internal",
          },
          {
            pattern: "common",
            group: "internal",
          },
          {
            pattern: "hooks",
            group: "internal",
          },
          {
            pattern: "routes/ **",
            group: "internal",
          },
          {
            pattern: "assets/**",
            group: "internal",
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["internal"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        trailingComma: "es5",
      },
    ],
    // Add TypeScript-specific rules
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
  },
};
