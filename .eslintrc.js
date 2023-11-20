module.exports = {
  root: true,
  extends: ["universe/native"],
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
  },
};
