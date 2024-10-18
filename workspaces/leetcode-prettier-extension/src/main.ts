import { format } from "prettier/standalone";
import estreePlugin from "prettier/plugins/estree";
import tsPlugin from "prettier/plugins/typescript";

function main(): void {
  // TODO: improve types
  let monaco: any = undefined;

  Object.defineProperty(globalThis, "monaco", {
    get() {
      return monaco;
    },

    set(newMonaco) {
      monaco = newMonaco;
      monaco.editor.onDidCreateEditor((ed: any) => {
        const { getAction } = ed;
        ed.getAction = function (this: unknown) {
          const action = getAction.apply(this, arguments);
          action.run = function () {
            format(ed.getValue(), {
              parser: "typescript",
              plugins: [estreePlugin, tsPlugin],
            }).then((text) =>
              // TODO: switch to https://microsoft.github.io/monaco-editor/typedoc/interfaces/editor.ITextModel.html#pushEditOperations.pushEditOperations-1 in the future
              ed.setValue(text),
            );
          };
          return action;
        };
      });
    },
  });
}

main();
