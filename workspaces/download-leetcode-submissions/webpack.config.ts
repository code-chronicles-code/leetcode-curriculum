import { builtinModules } from "node:module";
import path from "node:path";

import webpack, {
  type Configuration,
  type ExternalItemFunctionData,
} from "webpack";

import { stripPrefix } from "@code-chronicles/util/stripPrefix";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import packageJson from "./package.json" with { type: "module" };

const config: Configuration = {
  target: "node",
  entry: path.resolve(__dirname, packageJson.exports),
  output: {
    filename:
      stripPrefixOrThrow(packageJson.name, "@code-chronicles/") + ".cjs",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
        exclude: /\bnode_modules\b/,
      },
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", "..."],
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js"],
    },
  },

  externalsType: "commonjs",
  externals: ({ request }: ExternalItemFunctionData) =>
    Promise.resolve(
      request != null &&
        (builtinModules.includes(request) ||
          builtinModules.includes(stripPrefix(request, "node:")))
        ? request
        : undefined,
    ),

  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node\n",
      raw: true,
      entryOnly: true,
    }),
  ],
};

export default config;
