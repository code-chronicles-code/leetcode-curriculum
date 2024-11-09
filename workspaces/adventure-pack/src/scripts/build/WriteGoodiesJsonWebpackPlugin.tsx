import type { Compiler } from "webpack";

import { jsonStringifyPrettyInDev } from "@code-chronicles/util/jsonStringifyPrettyInDev";

import { GOODIES_FILENAME } from "../../app/constants.ts";
import { readAllGoodies } from "../package-goodies/readAllGoodies.ts";

export class WriteGoodiesJsonWebpackPlugin {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: this.constructor.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        async () => {
          const goodies = await readAllGoodies();

          compilation.emitAsset(
            GOODIES_FILENAME,
            new compiler.webpack.sources.RawSource(
              jsonStringifyPrettyInDev(goodies),
            ),
          );
        },
      );
    });
  }
}
