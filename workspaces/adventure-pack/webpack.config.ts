import { execSync } from "node:child_process";
import path from "node:path";

import webpack, { type Configuration } from "webpack";

import { WEB_APP_DIST } from "./src/scripts/build/constants.ts";

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
              // TODO: Consider using fork-ts-checker-webpack-plugin for typechecking.
              transpileOnly: true,
            },
          },
        ],
        exclude: /\bnode_modules\b/,
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      ADVENTURE_PACK_COMMIT_HASH: JSON.stringify(commitHash),
    }),
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
