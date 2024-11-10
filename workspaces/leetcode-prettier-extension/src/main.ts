import nullthrows from "nullthrows";
import { format } from "prettier/standalone";
import estreePlugin from "prettier/plugins/estree";
import tsPlugin from "prettier/plugins/typescript";

import { assignFunctionCosmeticProperties } from "@code-chronicles/util/object-properties/assignFunctionCosmeticProperties";

import { isMonaco } from "./isMonaco.ts";

function main(): void {
  let monaco: unknown;

  Object.defineProperty(globalThis, "monaco", {
    get() {
      return monaco;
    },

    set(newMonaco: unknown) {
      monaco = newMonaco;
      if (!isMonaco(monaco)) {
        console.error(
          "The `monaco` property doesn't follow the expected interface!",
        );
        return;
      }

      monaco.editor.onDidCreateEditor((ed) => {
        try {
          nullthrows(ed.getModel()).updateOptions({
            tabSize: 2,
            indentSize: "tabSize",
          });
        } catch (err) {
          console.error(err);
        }

        if (typeof ed?.getAction !== "function") {
          console.error("Monaco editor doesn't have a `getAction` method!");
          return;
        }

        const { getAction } = ed;
        ed.getAction = assignFunctionCosmeticProperties(function (
          this: unknown,
        ) {
          const action = getAction.apply(
            this,
            // Slight lie but `.apply` will work with the `arguments` object.
            arguments as unknown as Parameters<typeof getAction>,
          );

          if (typeof action?.run !== "function") {
            console.error("Monaco action object doesn't have a `run` method!");
            return action;
          }

          action.run = assignFunctionCosmeticProperties(async function () {
            try {
              const formattedText = await format(ed.getValue(), {
                parser: "typescript",
                plugins: [estreePlugin, tsPlugin],
              });

              ed.executeEdits("Prettier", [
                {
                  range: nullthrows(ed.getModel()).getFullModelRange(),
                  text: formattedText,
                },
              ]);
            } catch (err) {
              console.error(err);
            }
          }, action.run);

          return action;
        }, getAction);
      });
    },
  });
}

main();
