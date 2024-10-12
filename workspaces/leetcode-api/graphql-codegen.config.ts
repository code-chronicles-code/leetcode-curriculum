import dedent from "dedent";

import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types as GraphQLCodegen } from "@graphql-codegen/plugin-helpers";

import { SCHEMA_FILE_PATCHED } from "./src/scripts/patch-graphql-schema/constants.ts";

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
    content:
      dedent`
      // THIS FILE IS GENERATED! DO NOT MODIFY IT MANUALLY!!
      // Instead, update the generation process or inputs and run \`yarn codegen\`.
    ` + "\n\n",
    placement: "prepend",
  },
};

const config: CodegenConfig = {
  schema: SCHEMA_FILE_PATCHED,
  documents: ["src/api/**/query.graphql"],
  overwrite: true,
  emitLegacyCommonJSImports: false,
  generates: {
    // Generate the base types file!
    "src/graphqlTypes.generated.ts": {
      plugins: [headerPlugin, "typescript"],
      config: commonTypeScriptPluginConfig,
    },

    // Generate a small SDK for each operation using our custom plugin.
    "src/api/**/fetchGraphQL.generated.ts": {
      preset: "near-operation-file",
      presetConfig: {
        // We enable `globalNamespace` below so that we don't import the base
        // types through the preset, but let the specified plugins add the
        // imports if necessary. This allows us to make sure the base types
        // import is below the header, and it uses the ".ts" extension.
        baseTypesPath: "<not-used-but-cannot-be-empty>",

        fileName: "fetchGraphQL",
        extension: ".generated.ts",
      },
      plugins: [
        headerPlugin,

        {
          "typescript-operations": {
            // Override the `globalNamespace` which was set in the preset.
            globalNamespace: false,
          },
        },

        "./src/scripts/codegen/graphqlCodegenPlugin.ts",
      ],
      config: {
        ...commonTypeScriptPluginConfig,

        // Specified plugins will handle the imports and exports!
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
