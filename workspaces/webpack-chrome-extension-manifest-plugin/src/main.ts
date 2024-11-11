import type { JsonObject } from "type-fest";
import type { Compiler } from "webpack";

import { jsonStringifyPrettyInDev } from "@code-chronicles/util/jsonStringifyPrettyInDev";

// TODO: consider generalizing to a simple JSON plugin

export class WebpackChromeExtensionManifestPlugin {
  constructor(private manifest: JsonObject) {}

  apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
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
