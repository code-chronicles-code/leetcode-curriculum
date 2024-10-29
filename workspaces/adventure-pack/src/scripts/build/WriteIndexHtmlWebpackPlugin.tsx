import React from "react";
import ReactDOMServer from "react-dom/server";
import type { Compiler } from "webpack";

import { App } from "../../app/components/App.tsx";

export class WriteIndexHtmlWebpackPlugin {
  constructor(private commitHash: string) {}

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: this.constructor.name,
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset(
            "index.html",
            new compiler.webpack.sources.RawSource(
              "<!DOCTYPE html>\n" +
                ReactDOMServer.renderToStaticMarkup(
                  <html lang="en-US">
                    <head>
                      <meta charSet="utf-8" />
                      <title>Adventure Pack</title>
                      <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                        crossOrigin=""
                      />
                      <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin=""
                      />
                      <link
                        href="https://fonts.googleapis.com/css2?family=Courgette&display=swap"
                        rel="stylesheet"
                      />
                      <script async src="main.js" />
                      <script async src="dependencies.js" />
                      <link href="style.css" rel="stylesheet" />
                    </head>
                    <body>
                      <div id="main">
                        <App commitHash={this.commitHash} />
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
