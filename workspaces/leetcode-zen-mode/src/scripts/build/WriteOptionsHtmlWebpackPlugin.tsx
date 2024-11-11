import React from "react";
import ReactDOMServer from "react-dom/server";
import type { Compiler } from "webpack";

import { App } from "../../extension/options-ui/components/App.tsx";

export class WriteOptionsHtmlWebpackPlugin {
  constructor(private options: { htmlFilename: string; jsFilename: string }) {}

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.constructor.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset(
            this.options.htmlFilename,
            new compiler.webpack.sources.RawSource(
              "<!DOCTYPE html>\n" +
                ReactDOMServer.renderToStaticMarkup(
                  <html lang="en-US">
                    <head>
                      <meta charSet="utf-8" />
                      <title>Options</title>
                      <script async src={this.options.jsFilename} />
                    </head>
                    <body>
                      <div id="main">
                        <App />
                      </div>
                    </body>
                  </html>,
                ) +
                "\n",
            ),
          );
        },
      );
    });
  }
}
