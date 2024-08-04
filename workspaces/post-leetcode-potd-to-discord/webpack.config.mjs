import path from "node:path";

import webpack from "webpack";

export default {
  entry: "./src/main.ts",
  output: {
    filename: "post-leetcode-potd-to-discord.js",
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
  externals: {
    // TODO: figure out a way to programmatically generate this list or configure Node packages
    buffer: "buffer",
    "node:assert": "node:assert",
    "node:async_hooks": "node:async_hooks",
    "node:buffer": "node:buffer",
    "node:child_process": "node:child_process",
    "node:console": "node:console",
    "node:crypto": "node:crypto",
    "node:diagnostics_channel": "node:diagnostics_channel",
    "node:events": "node:events",
    "node:fs": "node:fs",
    "node:fs/promises": "node:fs/promises",
    "node:http": "node:http",
    "node:http2": "node:http2",
    "node:net": "node:net",
    "node:os": "node:os",
    "node:path": "node:path",
    "node:perf_hooks": "node:perf_hooks",
    "node:process": "node:process",
    "node:querystring": "node:querystring",
    "node:stream": "node:stream",
    "node:timers": "node:timers",
    "node:timers/promises": "node:timers/promises",
    "node:tls": "node:tls",
    "node:url": "node:url",
    "node:util": "node:util",
    "node:util/types": "node:util/types",
    "node:worker_threads": "node:worker_threads",
    "node:zlib": "node:zlib",
    path: "path",
    process: "process",
    string_decoder: "string_decoder",
    timers: "timers",
    "timers/promises": "timers/promises",
    worker_threads: "worker_threads",
    url: "url",
    util: "util",
    zlib: "zlib",
    "zlib-sync": "zlib-sync",
  },

  plugins: [
    new webpack.BannerPlugin({
      banner: "#!node\n",
      raw: true,
      entryOnly: true,
    }),
  ],
};
