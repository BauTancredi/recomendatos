module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "import/order": [
      1,
      {
        groups: [
          "external",
          "builtin",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
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
  },
  // overrides: [
  //   // override "simple-import-sort" config
  //   {
  //     files: ["*.js", "*.jsx", "*.ts", "*.tsx"],
  //     rules: {
  //       "simple-import-sort/imports": [
  //         "error",
  //         {
  //           groups: [
  //             // Packages `react` related packages come first.
  //             ["^react", "^@?\\w"],
  //             // Internal packages.
  //             ["^(@|components)(/.*|$)"],
  //             // Side effect imports.
  //             ["^\\u0000"],
  //             // Parent imports. Put `..` last.
  //             ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
  //             // Other relative imports. Put same-folder imports and `.` last.
  //             ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
  //             // Style imports.
  //             ["^.+\\.?(css)$"],
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // ],
};
