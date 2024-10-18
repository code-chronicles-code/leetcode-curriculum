import type { editor as MonacoEditorNamespace } from "monaco-editor";

type Monaco = { editor: typeof MonacoEditorNamespace };

type RecursiveObj = { [key: string]: RecursiveObj | undefined };

export function isMonaco(obj: unknown): obj is Monaco {
  return (
    // The optional chaining should make the cast safe enough.
    typeof (obj as RecursiveObj | null | undefined)?.editor
      ?.onDidCreateEditor === "function"
  );
}
