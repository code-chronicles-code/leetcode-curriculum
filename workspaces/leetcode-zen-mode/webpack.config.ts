import path from "node:path";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { Configuration } from "webpack";

import { WebpackChromeExtensionManifestPlugin } from "@code-chronicles/webpack-chrome-extension-manifest-plugin";

import packageJson from "./package.json" with { type: "json" };

const SCRIPT_FILENAME = "main.js";

const config: Configuration = {
  target: "web",
  entry: path.resolve(__dirname, packageJson.exports),
  output: {
    filename: SCRIPT_FILENAME,
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

  plugins: [
    new ForkTsCheckerWebpackPlugin(),

    new WebpackChromeExtensionManifestPlugin({
      name: "LeetCode Zen Mode",
      description: packageJson.description,
      version: packageJson.version,

      // eslint-disable-next-line camelcase
      manifest_version: 3,
      // eslint-disable-next-line camelcase
      content_scripts: [
        {
          matches: ["https://*.leetcode.com/*"],
          js: [SCRIPT_FILENAME],
          // eslint-disable-next-line camelcase
          run_at: "document_start",
          world: "MAIN",
        },
      ],
    }),
  ],
};

export default config;
