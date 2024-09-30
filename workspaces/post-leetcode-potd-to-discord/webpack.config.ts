import { builtinModules } from "node:module";
import path from "node:path";

import {
  BannerPlugin,
  type Configuration,
  type ExternalItemFunctionData,
} from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { WebpackMakeOutputExecutablePlugin } from "@code-chronicles/webpack-make-output-executable-plugin";

import { stripPrefix } from "@code-chronicles/util/stripPrefix";
import { stripPrefixOrThrow } from "@code-chronicles/util/stripPrefixOrThrow";

import packageJson from "./package.json" with { type: "json" };

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
              transpileOnly: true,
            },
          },
        ],
        exclude: /\bnode_modules\b/,
      },
    ],
  },

  resolve: {
    conditionNames: ["import"],
  },

  externalsType: "commonjs",
  externals: [
    ({ request }: ExternalItemFunctionData) =>
      Promise.resolve(
        request != null &&
          (builtinModules.includes(request) ||
            builtinModules.includes(stripPrefix(request, "node:")))
          ? request
          : undefined,
      ),
    {
      // TODO: see if we can use asset/inline for this library
      "zlib-sync": "zlib-sync",
    },
  ],

  plugins: [
    new BannerPlugin({
      banner: "#!/usr/bin/env node\n",
      raw: true,
      entryOnly: true,
    }),

    new WebpackMakeOutputExecutablePlugin(),

    new ForkTsCheckerWebpackPlugin(),
  ],
};

export default config;
