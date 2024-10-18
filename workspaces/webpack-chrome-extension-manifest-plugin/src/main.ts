import type { JsonObject } from "type-fest";
import type { Compiler } from "webpack";

import { jsonStringifyPrettyInDev } from "@code-chronicles/util/jsonStringifyPrettyInDev";

export class WebpackChromeExtensionManifestPlugin {
  constructor(private manifest: JsonObject) {}

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap("ManifestPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.constructor.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset(
            "manifest.json",
            new compiler.webpack.sources.RawSource(
              jsonStringifyPrettyInDev(this.manifest),
            ),
          );
        },
      );
    });
  }
}
