const { execSync } = require("node:child_process");
const path = require("node:path");
const webpack = require("webpack");

const commitHash = execSync("git rev-parse HEAD").toString().trim();

module.exports = {
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
