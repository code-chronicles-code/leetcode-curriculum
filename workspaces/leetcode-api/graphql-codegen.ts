import type { CodegenConfig } from "@graphql-codegen/cli";

const commonTypeScriptPluginConfig = {
  arrayInputCoercion: false,
  avoidOptionals: true,
  enumsAsTypes: true,
  defaultScalarType: "unknown",
  skipTypename: true,
  useTypeImports: true,

  // TODO: add strictScalars: true
};

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["src/**/*.graphql"],
  overwrite: true,
  emitLegacyCommonJSImports: false,
  generates: {
    "src/graphqlTypes.generated.ts": {
      plugins: ["typescript"],
      config: commonTypeScriptPluginConfig,
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "~./graphqlTypes.generated",
        extension: ".generated.ts",
      },
      plugins: ["typescript-operations"],
      config: commonTypeScriptPluginConfig,
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
