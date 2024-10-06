import type { CodegenConfig } from "@graphql-codegen/cli";

const commonTypeScriptPluginConfig = {
  arrayInputCoercion: false,
  enumsAsTypes: true,
  defaultScalarType: "unknown",
  skipTypename: true,
  useTypeImports: true,

  // TODO: add strictScalars: true
};

const headerPlugin = {
  add: {
    content: `
      // THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
      // Instead, update the generation process or inputs and run \`yarn codegen\`.
    `,
  },
};

const config: CodegenConfig = {
  schema: "schema.graphql",
  documents: ["src/**/*.graphql"],
  overwrite: true,
  emitLegacyCommonJSImports: false,
  generates: {
    "src/graphqlTypes.generated.ts": {
      plugins: [headerPlugin, "typescript"],
      config: commonTypeScriptPluginConfig,
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        // The base types are not imported because of the use of
        // `globalNamespace` below, instead our custom plugin will add the
        // import, so that it can end up _below_ the header.
        baseTypesPath: "<not-used-but-cannot-be-empty>",

        extension: ".generated.ts",
        fileName: "fetchGraphQL",
      },
      plugins: [
        headerPlugin,
        { "typescript-operations": { globalNamespace: false } },
        "./src/scripts/codegen/graphqlCodegenPlugin.ts",
      ],
      config: {
        ...commonTypeScriptPluginConfig,

        // Our custom plugin will handle the imports and exports!
        globalNamespace: true,
        noExport: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
