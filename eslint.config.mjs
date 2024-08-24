import config from "@code-chronicles/eslint-config";

export default [
  ...config,
  {
    // Ignore the workspaces directory, it will handle its own linting.
    // See the "lint" script in `package.json`.
    ignores: ["workspaces/"],
  },
];
