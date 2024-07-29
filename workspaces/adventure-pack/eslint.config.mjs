import config from "@code-chronicles/eslint-config";

export default [
  ...config,
  {
    ignores: ["dist/", "goodies/java/build/", "goodies/kotlin/build/"],
  },
];
