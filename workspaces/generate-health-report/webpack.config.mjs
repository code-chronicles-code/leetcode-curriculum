// TODO: convert more of the webpack configs to .mjs format

import path from "node:path";

export default {
  entry: "./src/main.ts",
  output: {
    filename: "generate-health-report.js",
    libraryTarget: "commonjs2",
    path: path.join(import.meta.dirname, "dist"),
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
  },

  externalsType: "commonjs",
  externals: {
    "node:child_process": "node:child_process",
    "node:fs/promises": "node:fs/promises",
    "node:process": "node:process",
  },
};
