import { format } from "prettier/standalone";
import estreePlugin from "prettier/plugins/estree";
import tsPlugin from "prettier/plugins/typescript";

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
        ed
          ?.getModel?.()
          ?.updateOptions?.({ tabSize: 2, indentSize: "tabSize" });

        if (typeof ed?.getAction !== "function") {
          // TODO: console.error something interesting
          return;
        }

        const { getAction } = ed;

        ed.getAction = function (this: unknown) {
          const action = getAction.apply(
            this,
            // Slight lie but `.apply` will work with the `arguments` object.
            arguments as unknown as Parameters<typeof getAction>,
          );
          if (!action) {
            // TODO: console.error something interesting
            return action;
          }

          action.run = async function () {
            try {
              const formattedText = await format(ed.getValue(), {
                parser: "typescript",
                plugins: [estreePlugin, tsPlugin],
              });

              // TODO: switch to https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.ITextModel.html#pushEditOperations.pushEditOperations-1 in the future
              ed.setValue(formattedText);
            } catch (err) {
              console.error(err);
            }
          };

          return action;
        };
      });
    },
  });
}

main();
