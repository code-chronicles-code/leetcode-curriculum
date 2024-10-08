import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types as GraphQLCodegen } from "@graphql-codegen/plugin-helpers";
import immutableUpdate from "immutability-helper";

import { SCHEMA_PATCHED_FILE } from "./src/scripts/scrape-graphql-schema/constants.ts";

const commonTypeScriptPluginConfig: GraphQLCodegen.PluginConfig = {
  arrayInputCoercion: false,
  enumsAsTypes: true,
  defaultScalarType: "unknown",
  skipTypename: true,
  useTypeImports: true,

  strictScalars: true,
  scalars: {
    Date: {
      input: "unknown",
      output: "string",
    },
    DateTime: {
      input: "unknown",
      output: "string",
    },
    Decimal: {
      input: "unknown",
      // For example: "4.816"
      output: "string",
    },
    JSONString: {
      input: "unknown",
      output: "string",
    },
    UUID: {
      input: "string",
      output: "string",
    },
  },
};

const headerPlugin: GraphQLCodegen.OutputConfig = {
  add: {
    content: `
      // THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
      // Instead, update the generation process or inputs and run \`yarn codegen\`.
    `,
    placement: "prepend",
  },
};

const nearOperationFilePreset: GraphQLCodegen.ConfiguredOutput = {
  preset: "near-operation-file",
  presetConfig: {
    // We enable `globalNamespace` below so that we don't import the base
    // types through the preset, but let the specified plugins add the imports
    // if necessary. This allows us to make sure the base types import is
    // below the header, and it uses the ".ts" extension.
    baseTypesPath: "<not-used-but-cannot-be-empty>",

    extension: ".generated.ts",
    fileName: null as string | null,
  },
  plugins: [headerPlugin],
  config: {
    ...commonTypeScriptPluginConfig,

    // Specified plugins will handle the imports and exports!
    globalNamespace: true,
    noExport: true,
  },
};

const config: CodegenConfig = {
  schema: SCHEMA_PATCHED_FILE,
  documents: ["src/api/**/query.graphql"],
  overwrite: true,
  emitLegacyCommonJSImports: false,
  generates: {
    // Generate the base types file!
    "src/graphqlTypes.generated.ts": {
      plugins: [headerPlugin, "typescript"],
      config: commonTypeScriptPluginConfig,
    },

    // Generate a file for the query variables and result types, near each
    // operation.
    "src/api/**/queryTypes.generated.ts": immutableUpdate(
      nearOperationFilePreset,
      {
        presetConfig: { fileName: { $set: "queryTypes" } },
        plugins: {
          $push: [
            // Explicitly add the base types import, since the preset was
            // tricked into not adding it.
            {
              add: {
                content:
                  '\n\nimport type * as Types from "../../graphqlTypes.generated.ts";\n\n',
                placement: "content",
              },
            },

            // Generate TypeScript operations types, overriding the
            // `globalNamespace` which was set in the preset.
            { "typescript-operations": { globalNamespace: false } },
          ],
        },

        // Do export the types.
        config: { noExport: { $set: false } },
      },
    ),

    // Generate a small SDK for each operation using our custom plugin.
    "src/api/**/fetchGraphQL.generated.ts": immutableUpdate(
      nearOperationFilePreset,
      {
        presetConfig: { fileName: { $set: "fetchGraphQL" } },
        plugins: {
          $push: ["./src/scripts/codegen/graphqlCodegenPlugin.ts"],
        },
      },
    ),
  },

  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};

export default config;
