import path from "node:path";

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import type { Configuration } from "webpack";

import { WebpackChromeExtensionManifestPlugin } from "@code-chronicles/webpack-chrome-extension-manifest-plugin";
import { stripSuffixOrThrow } from "@code-chronicles/util/stripSuffixOrThrow";

import { WriteOptionsHtmlWebpackPlugin } from "./src/scripts/build/WriteOptionsHtmlWebpackPlugin.tsx";
import packageJson from "./package.json" with { type: "json" };

const CONTENT_SCRIPT_FILENAME = "content-script.js";
const OPTIONS_HTML_FILENAME = "options.html";
const OPTIONS_SCRIPT_FILENAME = "options.js";

const config: Configuration = {
  target: "web",
  entry: {
    [stripSuffixOrThrow(CONTENT_SCRIPT_FILENAME, ".js")]: path.resolve(
      __dirname,
      packageJson.exports["./content-script"],
    ),
    [stripSuffixOrThrow(OPTIONS_SCRIPT_FILENAME, ".js")]: path.resolve(
      __dirname,
      packageJson.exports["./options-ui"],
    ),
  },
  output: {
    filename: "[name].js",
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

    new WriteOptionsHtmlWebpackPlugin({
      htmlFilename: OPTIONS_HTML_FILENAME,
      jsFilename: OPTIONS_SCRIPT_FILENAME,
    }),

    new WebpackChromeExtensionManifestPlugin({
      name: "LeetCode Zen Mode",
      description: packageJson.description,
      version: packageJson.version,

      // eslint-disable-next-line camelcase
      manifest_version: 3,

      permissions: ["storage"],

      // eslint-disable-next-line camelcase
      content_scripts: [
        {
          matches: ["https://*.leetcode.com/*"],
          js: [CONTENT_SCRIPT_FILENAME],
          // eslint-disable-next-line camelcase
          run_at: "document_start",
          world: "MAIN",
        },
      ],

      // eslint-disable-next-line camelcase
      options_ui: {
        page: OPTIONS_HTML_FILENAME,
        // eslint-disable-next-line camelcase
        open_in_tab: false,
      },
    }),
  ],
};

export default config;
