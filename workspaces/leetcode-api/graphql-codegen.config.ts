import type { CodegenConfig } from "@graphql-codegen/cli";

const commonTypeScriptPluginConfig = {
  arrayInputCoercion: false,
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
        // TODO: get this to use a ".ts" extension in the output
        baseTypesPath: "~../../graphqlTypes.generated",
        extension: ".generated.ts",
        fileName: "fetchGraphQL",
      },
      plugins: [
        "typescript-operations",
        "./src/scripts/codegen/graphqlCodegenPlugin.ts",
      ],
      config: {
        ...commonTypeScriptPluginConfig,

        // Our custom plugin will handle the exports!
        noExport: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: [
      // The per-operation files can end up with imports in the middle.
      "eslint --fix --rule import-x/first:warn",

      "prettier --write",
    ],
  },
};

export default config;
