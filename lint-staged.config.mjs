export default {
  // TODO: this doesn't quite work, because the `workspaces` directory is
  // ignored by Prettier at the top-level...
  "*.{graphql,json,md,js,jsx,mjs,ts,tsx,mts}": "prettier --write",
};
