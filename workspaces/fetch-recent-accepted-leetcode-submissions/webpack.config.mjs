import { builtinModules } from "node:module";
import path from "node:path";

import webpack from "webpack";

export default {
  target: "node",
  entry: "./src/main.ts",
  output: {
    filename: "fetch-recent-accepted-leetcode-submissions.js",
    path: path.resolve(import.meta.dirname, "dist"),
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
  externals: async ({ request }) =>
    builtinModules.includes(request) ||
    builtinModules.includes(request.replace(/^node:/, ""))
      ? request
      : undefined,

  plugins: [
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node\n",
      raw: true,
      entryOnly: true,
    }),
  ],
};
