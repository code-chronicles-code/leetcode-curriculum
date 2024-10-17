import path from "node:path";

import type { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import packageJson from "./package.json" with { type: "json" };

const config: Configuration = {
  target: "web",
  entry: path.resolve(__dirname, packageJson.exports),
  output: {
    filename: "main.js",
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

  plugins: [new ForkTsCheckerWebpackPlugin()],
};

export default config;
