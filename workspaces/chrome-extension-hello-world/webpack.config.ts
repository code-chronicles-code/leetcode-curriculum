import path from "node:path";

import type { Configuration } from "webpack";

import packageJson from "./package.json" with { type: "module" };

const config: Configuration = {
  target: "web",
  entry: path.resolve(__dirname, packageJson.exports),
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
