import config from "@code-chronicles/eslint-config";

// TODO: maybe read the .gitignore?
export default [...config, { ignores: ["dist/"] }];
