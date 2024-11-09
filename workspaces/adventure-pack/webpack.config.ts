import { execSync } from "node:child_process";
import path from "node:path";

import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { DefinePlugin, type Configuration } from "webpack";

import { WEB_APP_DIST } from "./src/scripts/build/constants.ts";
import { WriteGoodiesJsonWebpackPlugin } from "./src/scripts/build/WriteGoodiesJsonWebpackPlugin.tsx";
import { WriteIndexHtmlWebpackPlugin } from "./src/scripts/build/WriteIndexHtmlWebpackPlugin.tsx";

const commitHash = execSync("git rev-parse HEAD").toString().trim();

const config: Configuration = {
  target: "web",
  // TODO: for Chrome extension we will need devtool: "cheap-source-map" since we can't eval.
  entry: "./src/app/main.tsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, WEB_APP_DIST),
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
    new DefinePlugin({
      ADVENTURE_PACK_COMMIT_HASH: JSON.stringify(commitHash),
    }),

    // Add the other assets needed for the app.
    new CopyPlugin({ patterns: [{ from: "css", to: WEB_APP_DIST }] }),
    new WriteGoodiesJsonWebpackPlugin(),
    new WriteIndexHtmlWebpackPlugin(commitHash),

    new ForkTsCheckerWebpackPlugin(),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        dependencies: {
          test: /\bnode_modules\b/,
          name: "dependencies",
          chunks: "all",
        },
      },
    },
  },
};

export default config;
