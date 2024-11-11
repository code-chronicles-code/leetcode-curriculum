import { chmod } from "node:fs/promises";
import path from "node:path";

import type { Compiler } from "webpack";

// TODO: consider merging webpack plugins into single workspace

export class WebpackMakeOutputExecutablePlugin {
  apply(compiler: Compiler): void {
    compiler.hooks.afterEmit.tapPromise(
      this.constructor.name,
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
