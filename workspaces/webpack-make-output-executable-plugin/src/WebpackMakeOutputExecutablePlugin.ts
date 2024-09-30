import { chmod } from "node:fs/promises";
import path from "node:path";

import type { Compiler } from "webpack";

export class WebpackMakeOutputExecutablePlugin {
  // eslint-disable-next-line class-methods-use-this -- This is the interface expected by webpack.
  apply(compiler: Compiler): void {
    compiler.hooks.afterEmit.tapPromise(
      "WebpackMakeOutputExecutablePlugin",
      async (compilation) => {
        const promises: Promise<void>[] = [];

        for (const chunk of compilation.chunks) {
          if (!chunk.canBeInitial()) {
            continue;
          }

          for (const file of chunk.files) {
            promises.push(
              chmod(
                path.join(compilation.outputOptions.path ?? ".", file),
                0o755,
              ),
            );
          }
        }

        await Promise.all(promises);
      },
    );
  }
}
