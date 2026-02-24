import path from "node:path";

import type { Configuration } from "webpack";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

import { WriteIndexHtmlWebpackPlugin } from "./src/scripts/build/WriteIndexHtmlWebpackPlugin.tsx";

const config: Configuration = {
  target: "web",
  entry: "./src/app/main.tsx",
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
    // allowUnreachableCode necessary for tsgo (exhaustive switch handling differs from tsc)
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configOverwrite: {
          compilerOptions: { allowUnreachableCode: true },
        },
      },
    }),

    new WriteIndexHtmlWebpackPlugin(),
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
