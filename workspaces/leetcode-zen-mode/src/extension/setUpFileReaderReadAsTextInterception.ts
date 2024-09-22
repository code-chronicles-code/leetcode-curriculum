import { GRAPHQL_XHR_RESPONSE } from "./constants.ts";
import { rewriteGraphQLData } from "./rewriteGraphQLData.ts";

export function setUpFileReaderReadAsTextInterception(): void {
  const { readAsText } = FileReader.prototype;

  FileReader.prototype.readAsText = function (blob) {
    (window as unknown as Record<string, unknown>).foo = blob;
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
