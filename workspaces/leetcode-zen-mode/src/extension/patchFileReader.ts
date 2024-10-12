import { GRAPHQL_XHR_RESPONSE } from "./constants.ts";
import { rewriteGraphQLData } from "./rewriteGraphQLData.ts";

/**
 * Patch the `FileReader` class so that `Blob` objects labeled as LeetCode
 * GraphQL responses get rewritten.
 */
export function patchFileReader(): void {
  const { readAsText } = FileReader.prototype;

  FileReader.prototype.readAsText = function (blob) {
    if (!(blob instanceof Blob) || !Object.hasOwn(blob, GRAPHQL_XHR_RESPONSE)) {
      readAsText.apply(
        this,
        Array.from(arguments) as Parameters<typeof readAsText>,
      );
      return;
    }

    blob
      .text()
      .then((text) =>
        readAsText.call(
          this,
          new Blob([JSON.stringify(rewriteGraphQLData(JSON.parse(text)))]),
        ),
      );
  };
}
