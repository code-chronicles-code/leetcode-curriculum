import config from "@code-chronicles/eslint-config";

export default [
  ...config,
  {
    ignores: [
      // Ignore the workspaces directory, it will handle its own linting.
      // See the "lint" script in `package.json`.
      "workspaces/",

      // Minified Yarn code!
      ".yarn/releases/",
    ],
  },
];
